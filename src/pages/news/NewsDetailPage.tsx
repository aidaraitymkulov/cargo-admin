import { zodResolver } from '@hookform/resolvers/zod'
import { skipToken } from '@reduxjs/toolkit/query'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useGetNewsByIdQuery, useUpdateNewsMutation } from '@/api/admin/news/newsApi'
import { PageHeader } from '@/components/layout'
import { Button, Input, Label, Textarea } from '@/components/ui'
import { API_URL } from '@/lib'
import { cn } from '@/lib/utils'
import { newsFormSchema } from '@/types/entities/news'

type FormValues = {
  title: string
  content: string
}

const updateSchema = newsFormSchema.pick({ title: true, content: true })

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data, isLoading } = useGetNewsByIdQuery(id ?? skipToken)
  const [updateNews, { isLoading: isSaving }] = useUpdateNewsMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<FormValues>({ resolver: zodResolver(updateSchema) })

  useEffect(() => {
    if (data) reset({ title: data.title, content: data.content })
  }, [data, reset])

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData()
    if (dirtyFields.title) formData.append('title', values.title)
    if (dirtyFields.content) formData.append('content', values.content)

    await updateNews({ id: id ?? '', data: formData })
    toast.success('Новость обновлена')
    reset(values)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="size-10 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <PageHeader title={data?.title ?? ''} description="">
        <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => navigate('/news')}>
          <ArrowLeft className="size-4" />
          Назад
        </Button>
      </PageHeader>

      <div className="p-6 max-w-2xl space-y-6">
        {data?.image && (
          <img
            src={`${API_URL}${data.image}`}
            alt={data.title}
            className="h-56 w-full object-cover object-center rounded-xl"
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Заголовок</Label>
            <Input {...register('title')} />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Текст</Label>
            <Textarea rows={8} {...register('content')} />
            {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={!isDirty || isSaving}
            className={cn(
              'transition-colors',
              isDirty
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-muted text-muted-foreground',
            )}
          >
            {isSaving ? <Loader2 className="size-4 animate-spin" /> : 'Сохранить'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default NewsDetailPage
