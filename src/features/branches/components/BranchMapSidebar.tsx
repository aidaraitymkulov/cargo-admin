import { ChevronLeft, ChevronRight, Loader2, MapPin } from 'lucide-react'
import type { Control } from 'react-hook-form'
import { API_URL } from '@/shared/lib'
import type { BranchLocationValues } from '../types/schema'
import type { Branch } from '../types/types'
import { BranchLocationForm } from './BranchLocationForm'

interface Props {
  branches: Branch[]
  selectedBranch: Branch | null
  onSelect: (branch: Branch) => void
  onBackToList: () => void
  control: Control<BranchLocationValues>
  editLoc: boolean
  onToggleEditLoc: () => void
  onPhotoChange: (file: File) => void
  resetKey: string
  isDirty: boolean
  isSaving: boolean
  onSave: () => void
  onReset: () => void
}

export const BranchMapSidebar = ({
  branches,
  selectedBranch,
  onSelect,
  onBackToList,
  control,
  editLoc,
  onToggleEditLoc,
  onPhotoChange,
  resetKey,
  isDirty,
  isSaving,
  onSave,
  onReset,
}: Props) => (
  <div
    className="absolute top-0 right-0 bottom-0 z-450 w-93 max-w-[88vw]
               bg-white/95 dark:bg-ink-900/95 backdrop-blur-xl
               border-l border-stone-200/70 dark:border-white/6
               shadow-[-12px_0_40px_-20px_rgba(0,0,0,.3)]
               flex flex-col animate-rise"
  >
    {!selectedBranch ? (
      <>
        <div className="px-5 pt-5 pb-4 border-b border-stone-100 dark:border-white/6">
          <h3 className="text-[16px] font-bold tracking-tight text-stone-900 dark:text-white">
            Филиалы на карте
          </h3>
          <p className="mt-1 text-[12.5px] text-stone-500 dark:text-white/50">
            Выберите филиал, чтобы изменить адрес, точку или фото
          </p>
        </div>
        <div className="flex-1 overflow-y-auto nice-scroll p-3 flex flex-col gap-1.5">
          {branches.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => onSelect(b)}
              className="flex items-center gap-3 p-2.5 rounded-xl text-left transition-colors
                         hover:bg-stone-100/80 dark:hover:bg-white/4"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-forest-50 dark:bg-forest-400/10 text-forest-700 dark:text-forest-400">
                {b.photoUrl ? (
                  <img
                    src={`${API_URL}${b.photoUrl}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <MapPin size={16} strokeWidth={1.8} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold text-stone-900 dark:text-white truncate">
                  {b.address}
                </div>
                <div className="text-[11.5px] text-stone-400 dark:text-white/40 font-mono">
                  {b.personalCodePrefix}
                </div>
              </div>
              <ChevronRight
                size={15}
                strokeWidth={2}
                className="shrink-0 text-stone-300 dark:text-white/25"
              />
            </button>
          ))}
        </div>
      </>
    ) : (
      <>
        <div className="px-5 pt-5 pb-3.5 border-b border-stone-100 dark:border-white/6 flex items-start gap-3">
          <button
            type="button"
            onClick={onBackToList}
            className="shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center
                       text-stone-400 hover:text-stone-700 hover:bg-stone-100
                       dark:text-white/40 dark:hover:text-white dark:hover:bg-white/5 transition-colors"
          >
            <ChevronLeft size={17} strokeWidth={2.2} />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-[15.5px] font-bold tracking-tight text-stone-900 dark:text-white truncate">
                {selectedBranch.address}
              </h3>
              <span className="shrink-0 inline-flex items-center h-6 px-2 rounded-md font-mono text-[11.5px] font-bold bg-stone-100 dark:bg-white/6 text-stone-700 dark:text-white/80">
                {selectedBranch.personalCodePrefix}
              </span>
            </div>
            <p className="mt-0.5 text-[12px] text-stone-400 dark:text-white/40">
              Редактирование филиала
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto nice-scroll px-5 py-4">
          <BranchLocationForm
            control={control}
            editLoc={editLoc}
            onToggleEditLoc={onToggleEditLoc}
            photoUrl={selectedBranch.photoUrl}
            resetKey={resetKey}
            onPhotoChange={onPhotoChange}
          />
        </div>

        <div className="px-5 py-4 border-t border-stone-100 dark:border-white/6 flex gap-2.5">
          <button
            type="button"
            onClick={onReset}
            disabled={!isDirty || isSaving}
            className="flex-1 h-10 rounded-xl text-[13px] font-semibold transition-colors
                       bg-stone-100 hover:bg-stone-200 text-stone-700 disabled:opacity-40
                       dark:bg-white/6 dark:hover:bg-white/10 dark:text-white/80"
          >
            Сбросить
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!isDirty || isSaving}
            className="flex-1 h-10 rounded-xl text-[13px] font-semibold text-white transition-all
                       disabled:opacity-40 flex items-center justify-center gap-2
                       shadow-[0_4px_14px_-6px_rgba(14,56,38,.45),inset_0_1px_0_rgba(255,255,255,.18)]"
            style={{
              background: 'linear-gradient(180deg,#1A6B3F 0%,#0E3826 100%)',
            }}
          >
            {isSaving && <Loader2 size={14} strokeWidth={2} className="animate-spin" />}
            Сохранить
          </button>
        </div>
      </>
    )}
  </div>
)
