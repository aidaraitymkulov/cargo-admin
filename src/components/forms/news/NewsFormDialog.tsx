import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useCreateNewsMutation, useUpdateNewsMutation } from '@/api/admin/news/newsApi'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components/ui'
import { type News, newsFormSchema, type newsFormValues } from '@/types'

type IProps = {
  onClose: () => void
  news?: News
}

export const NewsFormDialog = ({ onClose, news }: IProps) => {
  const isEdit = !!news
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [createNews, { isLoading: isCreating }] = useCreateNewsMutation()
  const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation()

  const form = useForm<newsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: news?.title ?? '',
      content: news?.content ?? '',
    },
  })

  const onSubmit = async (values: newsFormValues) => {
    try {
      if (isEdit) {
        const formData = new FormData()
        if (values.title !== news.title) formData.append('title', values.title)
        if (values.content !== news.content) formData.append('content', values.content)
        formData.append('image', values.image)
        await updateNews({
          id: news.id,
          data: { title: values.title, content: values.content, image: values.image },
        }).unwrap()
        toast.success('Новость обновлена')
      } else {
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('content', values.content)
        formData.append('image', values.image)
        await createNews(formData).unwrap()
        toast.success('Новость создана')
      }
      onClose()
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Редактировать новость' : 'Создать новость'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Заголовок</FormLabel>
                  <FormControl>
                    <Input placeholder="Обновление тарифов на доставку" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Содержание</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Текст новости..."
                      className="min-h-40 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Фото</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) onChange(file)
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {value ? 'Изменить фото' : 'Выбрать фото'}
                      </Button>
                      {value && (
                        <span className="text-sm text-muted-foreground truncate max-w-xs">
                          {value.name}
                        </span>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button type="submit" disabled={isCreating || isUpdating}>
                {(isCreating || isUpdating) && <Loader2 className="size-4 animate-spin" />}
                {isEdit ? 'Сохранить' : 'Создать'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
