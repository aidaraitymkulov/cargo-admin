import { ImagePlus } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn } from '@/shared/lib/utils'

interface IProps {
  current?: string | null
  onChange: (file: File) => void
  className?: string
}

export const ImageDropZone = ({ current, onChange, className }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [drag, setDrag] = useState(false)
  const [preview, setPreview] = useState<string | null>(current ?? null)

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return
    setPreview(URL.createObjectURL(file))
    onChange(file)
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setDrag(true)
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDrag(false)
        handleFile(e.dataTransfer.files[0])
      }}
      className={cn(
        'group relative w-full cursor-pointer rounded-xl overflow-hidden transition-all',
        'border-2 border-dashed',
        drag
          ? 'border-forest-500 bg-forest-50 dark:bg-forest-400/10 scale-[.99]'
          : 'border-stone-200 dark:border-white/15 hover:border-forest-400 dark:hover:border-forest-500',
        className,
      )}
      style={{ aspectRatio: '100 / 46' }}
    >
      {preview && (
        <img
          src={preview}
          alt="фотография"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all',
          preview ? 'bg-black/0 group-hover:bg-black/40' : '',
        )}
      >
        {preview ? (
          <div className="flex flex-col items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/90 dark:bg-white/8 text-forest-700 dark:text-forest-400 shadow-card">
              <ImagePlus className="size-4.5" strokeWidth={1.8} />
            </div>
            <p className="text-[12px] font-semibold text-white drop-shadow-sm">
              Заменить изображение
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 py-8">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-stone-100 dark:bg-white/6 text-stone-400 dark:text-white/40 mb-1">
              <ImagePlus className="size-5" strokeWidth={1.6} />
            </div>
            <p className="text-[13px] font-semibold text-stone-600 dark:text-white/70">
              Выберите или перетащите изображение
            </p>
            <p className="text-[11.5px] text-stone-400 dark:text-white/35">
              JPG, PNG, WEBP — до 5 МБ
            </p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </button>
  )
}
