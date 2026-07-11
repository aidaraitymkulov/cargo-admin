import { MapPin, MousePointerClick } from 'lucide-react'
import { type Control, useWatch } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImageDropZone,
  Input,
} from '@/components/ui'
import { API_URL, FORM_INPUT_CLS, FORM_LABEL_CLS } from '@/lib'
import { cn } from '@/lib/utils'
import { formatPhoneInput } from '@/lib/utils/phone'
import type { BranchLocationValues } from '@/types/entities/branches'

interface Props {
  control: Control<BranchLocationValues>
  editLoc: boolean
  onToggleEditLoc: () => void
  photoUrl: string | null
  resetKey: string
  onPhotoChange: (file: File) => void
}

export const BranchLocationForm = ({
  control,
  editLoc,
  onToggleEditLoc,
  photoUrl,
  resetKey,
  onPhotoChange,
}: Props) => {
  const latitude = useWatch({ control, name: 'latitude' })
  const longitude = useWatch({ control, name: 'longitude' })

  return (
    <div className="flex flex-col gap-4">
      <ImageDropZone
        key={resetKey}
        current={photoUrl ? `${API_URL}${photoUrl}` : null}
        onChange={onPhotoChange}
        className="h-[150px]"
      />

      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={FORM_LABEL_CLS}>Адрес</FormLabel>
            <FormControl>
              <Input className={FORM_INPUT_CLS} placeholder="ул. Манаса 42, Бишкек" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={FORM_LABEL_CLS}>Телефон</FormLabel>
              <FormControl>
                <Input
                  className={cn(FORM_INPUT_CLS, 'font-mono tracking-wider')}
                  placeholder="+996700123456"
                  {...field}
                  onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="workingHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={FORM_LABEL_CLS}>Часы работы</FormLabel>
              <FormControl>
                <Input className={FORM_INPUT_CLS} placeholder="Пн-Пт 09:00-18:00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="rounded-xl border border-stone-200 dark:border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-3.5 py-3 bg-stone-50/70 dark:bg-white/3">
          <div className="flex items-center gap-2">
            <MapPin size={15} strokeWidth={2} className="text-forest-700 dark:text-forest-400" />
            <span className="text-[12.5px] font-semibold text-stone-700 dark:text-white/80">
              Точка на карте
            </span>
          </div>
          <button
            type="button"
            onClick={onToggleEditLoc}
            className={cn(
              'h-7 px-2.5 rounded-lg text-[11.5px] font-semibold transition-colors',
              editLoc
                ? 'bg-amber-500 text-white'
                : 'bg-forest-700/8 text-forest-800 hover:bg-forest-700/14 dark:bg-forest-400/12 dark:text-forest-300 dark:hover:bg-forest-400/20',
            )}
          >
            {editLoc ? 'Готово' : 'Переместить'}
          </button>
        </div>
        {editLoc && (
          <div className="px-3.5 py-2.5 text-[12px] leading-snug flex items-start gap-2 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-t border-amber-100 dark:border-amber-500/20">
            <MousePointerClick size={14} strokeWidth={2} className="shrink-0 mt-px" />
            Кликните на карту, чтобы поставить точку филиала в новое место.
          </div>
        )}
        <div className="px-3.5 py-2.5 font-mono text-[11.5px] text-stone-500 dark:text-white/45 border-t border-stone-100 dark:border-white/5">
          {latitude.toFixed(5)}, {longitude.toFixed(5)}
        </div>
      </div>
    </div>
  )
}
