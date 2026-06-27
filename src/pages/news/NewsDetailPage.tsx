import { zodResolver } from '@hookform/resolvers/zod'
import { skipToken } from '@reduxjs/toolkit/query'
import { ArrowLeft, Calendar, Loader2, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  useCreateNewsMutation,
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
} from '@/api/admin/news/newsApi'
import { PageHeader } from '@/components/layout'
import { Button, ImageDropZone } from '@/components/ui'
import { ROUTES } from '@/config'
import { useAppSelector } from '@/hooks'
import { API_URL, getApiErrorMessage } from '@/lib'
import { fmtDateTime } from '@/lib/utils'
import { ROLE } from '@/types/enums/role'
import { NewsDeleteDialog } from './NewsDeleteDialog'

const formSchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  content: z.string().min(1, 'Обязательное поле'),
})
type FormValues = z.infer<typeof formSchema>

const labelClass =
  'text-xs font-semibold font-mono tracking-widest text-stone-400 dark:text-white/35 uppercase'

const NewsDetailPage = () => {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const isCreateMode = !id

  const { data, isLoading } = useGetNewsByIdQuery(id ?? skipToken)
  const [createNews, { isLoading: isCreating }] = useCreateNewsMutation()
  const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation()

  const user = useAppSelector((s) => s.auth.user)
  const isSuperAdmin = user?.role === ROLE.SUPER_ADMIN

  const [editing, setEditing] = useState(isCreateMode)
  const [showDelete, setShowDelete] = useState(false)
  const [imgFile, setImgFile] = useState<File | null>(null)
  const [imgRequired, setImgRequired] = useState(false)

  const isSaving = isCreating || isUpdating

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '', content: '' },
  })

  const {
    handleSubmit,
    reset,
    formState: { isDirty, dirtyFields },
  } = form

  const enterEdit = () => {
    if (data) reset({ title: data.title, content: data.content })
    setImgFile(null)
    setEditing(true)
  }

  const cancelEdit = () => {
    if (isCreateMode) {
      navigate(ROUTES.NEWS.LIST)
      return
    }
    if (data) reset({ title: data.title, content: data.content })
    setImgFile(null)
    setEditing(false)
  }

  const onSubmit = async (values: FormValues) => {
    if (isCreateMode) {
      if (!imgFile) {
        setImgRequired(true)
        return
      }
      try {
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('content', values.content)
        formData.append('image', imgFile)
        const created = await createNews(formData).unwrap()
        toast.success('Новость создана')
        navigate(ROUTES.NEWS.DETAIL(created.id))
      } catch (err) {
        toast.error(getApiErrorMessage(err))
      }
    } else {
      try {
        const formData = new FormData()
        if (dirtyFields.title) formData.append('title', values.title)
        if (dirtyFields.content) formData.append('content', values.content)
        if (imgFile) formData.append('image', imgFile)
        await updateNews({ id: id ?? '', data: formData }).unwrap()
        toast.success('Новость обновлена')
        setImgFile(null)
        setEditing(false)
      } catch (err) {
        toast.error(getApiErrorMessage(err))
      }
    }
  }

  if (!isCreateMode && isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="size-10 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!isCreateMode && !data) return null

  const isFormDirty = isDirty || !!imgFile
  const showForm = editing || isCreateMode

  return (
    <>
      <div className="flex flex-col">
        <PageHeader title={isCreateMode ? 'Новая новость' : showForm ? '' : (data?.title ?? '')}>
          <div className="flex items-center gap-2">
            {showForm ? (
              <>
                <span className="text-[11px] font-semibold font-mono tracking-widest text-stone-400 dark:text-white/35 uppercase mr-2">
                  {isCreateMode ? 'Создание' : 'Редактирование'}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={cancelEdit}
                  disabled={isSaving}
                >
                  <ArrowLeft className="size-3.5" />
                  Отмена
                </Button>
                <Button
                  size="sm"
                  className="gap-1.5"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSaving || (!isCreateMode && !isFormDirty)}
                >
                  {isSaving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : isCreateMode ? (
                    'Создать'
                  ) : (
                    'Сохранить'
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-stone-400 hover:text-forest-700 dark:text-white/35 dark:hover:text-forest-400"
                  onClick={() => navigate(ROUTES.NEWS.LIST)}
                >
                  <ArrowLeft className="size-4" />
                  Все новости
                </Button>
                {isSuperAdmin && (
                  <>
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={enterEdit}>
                      <Pencil className="size-3.5" strokeWidth={2} />
                      Редактировать
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-500/20 dark:hover:bg-red-500/10"
                      onClick={() => setShowDelete(true)}
                    >
                      <Trash2 className="size-3.5" strokeWidth={2} />
                      Удалить
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </PageHeader>

        <div className="px-7 py-7 w-full max-w-225 mx-auto">
          {showForm ? (
            <>
              <ImageDropZone
                current={data?.image ? `${API_URL}${data.image}` : null}
                onChange={(file) => {
                  setImgFile(file)
                  setImgRequired(false)
                }}
              />
              {imgRequired && (
                <p className="mt-1.5 text-[11.5px] text-destructive">Обязательное поле</p>
              )}

              <div className="mt-7">
                <label htmlFor="news-title" className={labelClass}>
                  Заголовок
                </label>
                <textarea
                  id="news-title"
                  rows={2}
                  placeholder="Заголовок новости…"
                  className="w-full mt-2 text-[24px] font-bold tracking-tight leading-snug resize-none
                    bg-stone-50 dark:bg-white/4 text-stone-900 dark:text-white
                    border border-stone-200 dark:border-white/10 rounded-xl px-4 py-3
                    focus:outline-none focus:border-forest-700 dark:focus:border-forest-400
                    focus:ring-4 focus:ring-forest-700/8 dark:focus:ring-forest-400/10
                    transition-all placeholder:text-stone-300 dark:placeholder:text-white/20"
                  {...form.register('title')}
                />
                {form.formState.errors.title && (
                  <p className="mt-1.5 text-[11.5px] text-destructive">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>

              <div className="mt-6 border-t border-stone-100 dark:border-white/6" />

              <div className="mt-6">
                <label htmlFor="news-body" className={labelClass}>
                  Текст новости
                </label>
                <textarea
                  id="news-body"
                  rows={12}
                  placeholder="Текст новости…"
                  className="w-full mt-2 text-[15px] leading-relaxed resize-none
                    bg-stone-50 dark:bg-white/4 text-stone-700 dark:text-white/85
                    border border-stone-200 dark:border-white/10 rounded-xl px-4 py-3
                    focus:outline-none focus:border-forest-700 dark:focus:border-forest-400
                    focus:ring-4 focus:ring-forest-700/8 dark:focus:ring-forest-400/10
                    transition-all placeholder:text-stone-300 dark:placeholder:text-white/20"
                  {...form.register('content')}
                />
                {form.formState.errors.content && (
                  <p className="mt-1.5 text-[11.5px] text-destructive">
                    {form.formState.errors.content.message}
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {data?.image && (
                <div
                  className="relative rounded-2xl overflow-hidden shadow-card"
                  style={{ aspectRatio: '100/46' }}
                >
                  <img
                    src={`${API_URL}${data.image}`}
                    alt={data.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="mt-7">
                <h1 className="text-[28px] font-bold tracking-[-0.025em] leading-tight text-stone-900 dark:text-white">
                  {data?.title}
                </h1>
                <div className="mt-3 flex items-center gap-4 text-[12px] font-mono text-stone-400 dark:text-white/35">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.25" strokeWidth={1.8} />
                    Создано: {data?.createdAt ? fmtDateTime(data.createdAt) : ''}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-stone-100 dark:border-white/6" />

              <div className="mt-6 text-[15.5px] leading-[1.75] text-stone-700 dark:text-white/80 whitespace-pre-line">
                {data?.content}
              </div>
            </>
          )}
        </div>
      </div>

      {showDelete && (
        <NewsDeleteDialog
          id={data?.id ?? ''}
          title={data?.title ?? ''}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </>
  )
}

export default NewsDetailPage
