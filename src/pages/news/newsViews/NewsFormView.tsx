import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useCreateNewsMutation, useUpdateNewsMutation } from '@/api/admin/news/newsApi'
import { PageHeader } from '@/components/layout'
import { Button, ImageDropZone } from '@/components/ui'
import { ROUTES } from '@/config'
import { API_URL, FORM_TEXTAREA_CLS, getApiErrorMessage, SECTION_LABEL_CLS } from '@/lib'
import type { News } from '@/types/entities/news'
import { type NewsContentValues, newsContentSchema } from '@/types/entities/news'

interface Props {
  data?: News
  isCreateMode: boolean
  onSaved: (id: string) => void
  onCancel: () => void
}

export const NewsFormView = ({ data, isCreateMode, onSaved, onCancel }: Props) => {
  const [createNews, { isLoading: isCreating }] = useCreateNewsMutation()
  const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation()
  const [imgFile, setImgFile] = useState<File | null>(null)
  const [imgRequired, setImgRequired] = useState(false)

  const isSaving = isCreating || isUpdating

  const form = useForm<NewsContentValues>({
    resolver: zodResolver(newsContentSchema),
    defaultValues: { title: data?.title ?? '', content: data?.content ?? '' },
  })

  const {
    handleSubmit,
    formState: { isDirty, dirtyFields },
  } = form

  const onSubmit = async (values: NewsContentValues) => {
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
        onSaved(created.id)
      } catch (err) {
        toast.error(getApiErrorMessage(err))
      }
    } else {
      try {
        const formData = new FormData()
        if (dirtyFields.title) formData.append('title', values.title)
        if (dirtyFields.content) formData.append('content', values.content)
        if (imgFile) formData.append('image', imgFile)
        const updated = await updateNews({ id: data!.id, data: formData }).unwrap()
        toast.success('Новость обновлена')
        onSaved(updated.id)
      } catch (err) {
        toast.error(getApiErrorMessage(err))
      }
    }
  }

  const isFormDirty = isDirty || !!imgFile

  return (
    <div className="flex flex-col">
      <PageHeader
        title={isCreateMode ? 'Новая новость' : 'Редактирование'}
        breadcrumbs={[{ label: 'Новости', to: ROUTES.NEWS.LIST }]}
      >
        <div className="flex items-center gap-2">
          <span className={`${SECTION_LABEL_CLS} mr-2`}>
            {isCreateMode ? 'Создание' : 'Редактирование'}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={onCancel}
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
        </div>
      </PageHeader>

      <div className="px-7 py-7 w-full max-w-225 mx-auto">
        <ImageDropZone
          current={data?.image ? `${API_URL}${data.image}` : null}
          onChange={(file) => {
            setImgFile(file)
            setImgRequired(false)
          }}
        />
        {imgRequired && <p className="mt-1.5 text-[11.5px] text-destructive">Обязательное поле</p>}

        <div className="mt-7">
          <label htmlFor="news-title" className={SECTION_LABEL_CLS}>
            Заголовок
          </label>
          <textarea
            id="news-title"
            rows={2}
            placeholder="Заголовок новости…"
            className={`${FORM_TEXTAREA_CLS} mt-2 text-[24px] font-bold tracking-tight leading-snug`}
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
          <label htmlFor="news-body" className={SECTION_LABEL_CLS}>
            Текст новости
          </label>
          <textarea
            id="news-body"
            rows={12}
            placeholder="Текст новости…"
            className={`${FORM_TEXTAREA_CLS} mt-2 text-[15px] leading-relaxed text-stone-700 dark:text-white/85`}
            {...form.register('content')}
          />
          {form.formState.errors.content && (
            <p className="mt-1.5 text-[11.5px] text-destructive">
              {form.formState.errors.content.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
