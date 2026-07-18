import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, MapPin } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { MapContainer, Marker, TileLayer, useMap, useMapEvent, ZoomControl } from 'react-leaflet'
import { toast } from 'sonner'
import { getApiErrorMessage } from '@/shared/lib'
import { ThemeToggle } from '@/shared/ui'
import { useUpdateBranchMutation } from '../api/branchesApi'
import { DEFAULT_BRANCH_LAT, DEFAULT_BRANCH_LNG, DEFAULT_MAP_CENTER } from '../types/constants'
import { type BranchLocationValues, branchLocationSchema } from '../types/schema'
import type { Branch } from '../types/types'
import { BranchMapSidebar } from './BranchMapSidebar'
import { createBranchMarkerIcon } from './branchMarkerIcon'

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
const TILE_ATTRIBUTION = '&copy; OpenStreetMap &copy; CARTO'

type MarkerPoint = { id: string; prefix: string; lat: number; lng: number }

const pluralizeBranches = (n: number) => (n === 1 ? 'филиал' : n < 5 ? 'филиала' : 'филиалов')

const toDefaultValues = (branch: Branch): BranchLocationValues => ({
  address: branch.address,
  phone: branch.phone ?? '',
  workingHours: branch.workingHours ?? '',
  latitude: branch.latitude ?? DEFAULT_BRANCH_LAT,
  longitude: branch.longitude ?? DEFAULT_BRANCH_LNG,
})

interface MapFocusProps {
  points: MarkerPoint[]
  focusId: string | null
}

const MapFocus = ({ points, focusId }: MapFocusProps) => {
  const map = useMap()
  const didFit = useRef(false)

  useEffect(() => {
    if (didFit.current || points.length === 0) {
      if (points.length === 0) map.setView(DEFAULT_MAP_CENTER, 12)
      return
    }
    didFit.current = true
    const focused = focusId ? points.find((p) => p.id === focusId) : null
    if (focused) {
      map.setView([focused.lat, focused.lng], 15)
    } else {
      map.fitBounds(
        points.map((p) => [p.lat, p.lng]),
        { padding: [80, 80] },
      )
    }
  }, [map, points, focusId])

  return null
}

interface MapFlyToProps {
  target: { lat: number; lng: number } | null
}

const MapFlyTo = ({ target }: MapFlyToProps) => {
  const map = useMap()
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    if (target)
      map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 14), {
        duration: 0.6,
      })
  }, [map, target])

  return null
}

interface MapClickHandlerProps {
  enabled: boolean
  onPick: (lat: number, lng: number) => void
}

const MapClickHandler = ({ enabled, onPick }: MapClickHandlerProps) => {
  useMapEvent('click', (e) => {
    if (enabled) onPick(+e.latlng.lat.toFixed(6), +e.latlng.lng.toFixed(6))
  })
  return null
}

interface Props {
  branches: Branch[]
  focusId: string | null
  onBack: () => void
}

export const BranchMapView = ({ branches, focusId, onBack }: Props) => {
  const [updateBranch, { isLoading: isSaving }] = useUpdateBranchMutation()

  const [selectedId, setSelectedId] = useState<string | null>(focusId)
  const [editLoc, setEditLoc] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [resetCounter, setResetCounter] = useState(0)

  const selectedBranch = useMemo(
    () => branches.find((b) => b.id === selectedId) ?? null,
    [branches, selectedId],
  )

  const form = useForm<BranchLocationValues>({
    resolver: zodResolver(branchLocationSchema),
    defaultValues: selectedBranch ? toDefaultValues(selectedBranch) : undefined,
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset must fire only when the selection changes, not on every branches refetch
  useEffect(() => {
    if (selectedBranch) {
      form.reset(toDefaultValues(selectedBranch))
      setEditLoc(false)
      setPhotoFile(null)
      setResetCounter((c) => c + 1)
    }
  }, [selectedId])

  const watchedLat = useWatch({ control: form.control, name: 'latitude' })
  const watchedLng = useWatch({ control: form.control, name: 'longitude' })

  const points = useMemo<MarkerPoint[]>(
    () =>
      branches.map((b) => ({
        id: b.id,
        prefix: b.personalCodePrefix,
        lat: b.latitude ?? DEFAULT_BRANCH_LAT,
        lng: b.longitude ?? DEFAULT_BRANCH_LNG,
      })),
    [branches],
  )

  const handleSelect = (branch: Branch) => setSelectedId(branch.id)

  const handlePick = (lat: number, lng: number) => {
    form.setValue('latitude', lat, { shouldDirty: true })
    form.setValue('longitude', lng, { shouldDirty: true })
  }

  const handleReset = () => {
    if (!selectedBranch) return
    form.reset(toDefaultValues(selectedBranch))
    setPhotoFile(null)
    setEditLoc(false)
    setResetCounter((c) => c + 1)
  }

  const handleSave = form.handleSubmit(async (values) => {
    if (!selectedBranch) return
    const dirty = form.formState.dirtyFields
    const formData = new FormData()
    if (dirty.address) formData.append('address', values.address)
    if (dirty.phone) formData.append('phone', values.phone)
    if (dirty.workingHours) formData.append('workingHours', values.workingHours)
    if (dirty.latitude || dirty.longitude) {
      formData.append('latitude', String(values.latitude))
      formData.append('longitude', String(values.longitude))
    }
    if (photoFile) formData.append('photo', photoFile)

    try {
      const updated = await updateBranch({
        id: selectedBranch.id,
        data: formData,
      }).unwrap()
      toast.success('Филиал обновлён')
      form.reset(toDefaultValues(updated))
      setPhotoFile(null)
      setEditLoc(false)
      setResetCounter((c) => c + 1)
    } catch (err) {
      toast.error(getApiErrorMessage(err))
    }
  })

  const isDirty = form.formState.isDirty || !!photoFile

  return (
    <div className="relative flex-1 min-w-0 h-full">
      <MapContainer
        center={DEFAULT_MAP_CENTER}
        zoom={12}
        zoomControl={false}
        className="absolute inset-0 z-0 ades-map"
      >
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} maxZoom={20} />
        <ZoomControl position="bottomright" />
        <MapFocus points={points} focusId={focusId} />
        <MapFlyTo target={selectedId ? { lat: watchedLat, lng: watchedLng } : null} />
        <MapClickHandler enabled={editLoc && !!selectedId} onPick={handlePick} />

        {points.map((p) => {
          const isSelected = p.id === selectedId
          const position: [number, number] = isSelected ? [watchedLat, watchedLng] : [p.lat, p.lng]
          const branch = branches.find((b) => b.id === p.id)
          return (
            <Marker
              key={p.id}
              position={position}
              icon={createBranchMarkerIcon(p.prefix, isSelected, isSelected && editLoc)}
              zIndexOffset={isSelected ? 1000 : 0}
              eventHandlers={{ click: () => branch && handleSelect(branch) }}
            />
          )
        })}
      </MapContainer>

      <div className="absolute top-4 left-4 z-500 flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="h-10 px-3.5 rounded-xl text-[13px] font-semibold flex items-center gap-1.5
                     bg-white/90 hover:bg-white text-stone-800 shadow-card backdrop-blur-md
                     dark:bg-ink-900/85 dark:hover:bg-ink-900 dark:text-white
                     border border-stone-200/60 dark:border-white/10 transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={2.5} /> Список
        </button>
        <div
          className="h-10 px-3.5 rounded-xl flex items-center gap-2 text-[12.5px] font-medium
                     bg-white/90 text-stone-600 shadow-card backdrop-blur-md
                     dark:bg-ink-900/85 dark:text-white/70 border border-stone-200/60 dark:border-white/10"
        >
          <MapPin size={14} strokeWidth={2} className="text-forest-700 dark:text-forest-400" />
          {branches.length} {pluralizeBranches(branches.length)}
        </div>
      </div>

      <div className="absolute top-4 right-4 z-500">
        <ThemeToggle />
      </div>

      <BranchMapSidebar
        branches={branches}
        selectedBranch={selectedBranch}
        onSelect={handleSelect}
        onBackToList={() => setSelectedId(null)}
        control={form.control}
        editLoc={editLoc}
        onToggleEditLoc={() => setEditLoc((v) => !v)}
        onPhotoChange={setPhotoFile}
        resetKey={`${selectedId ?? 'none'}:${resetCounter}`}
        isDirty={isDirty}
        isSaving={isSaving}
        onSave={handleSave}
        onReset={handleReset}
      />
    </div>
  )
}
