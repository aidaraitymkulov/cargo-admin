import { Upload, FileSpreadsheet, CheckCircle2, AlertTriangle } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const importTypes = [
  {
    title: 'Импорт из Китая',
    description: 'Загрузка посылок из Китая (трекинг + персональный код)',
    endpoint: '/admin/import/parcels/cn',
    columns: 'A = hatch, B = personalCode',
  },
  {
    title: 'Прибытие в КР',
    description: 'Обработка посылок по прибытию в Кыргызстан',
    endpoint: '/admin/import/parcels/kg/{prefix}/in-kg',
    columns: 'A = personalCode, B = hatch, C = вес, D = цена',
  },
  {
    title: 'Доставлено',
    description: 'Пометить заказы как доставленные клиентам',
    endpoint: '/admin/import/parcels/kg/{prefix}/delivered',
    columns: 'Формат аналогичен "Прибытие в КР"',
  },
]

const recentImports = [
  { type: 'CN', file: 'china_parcels_03_03.xlsx', processed: 142, errors: 0, time: '5 мин назад' },
  { type: 'IN_KG', file: 'arrivals_AN_02_03.xlsx', processed: 87, errors: 3, time: '1 день назад' },
  { type: 'DELIVERED', file: 'delivered_BK_01_03.xlsx', processed: 34, errors: 1, time: '2 дня назад' },
]

export function ImportsPage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="Импорт данных" description="Загрузка Excel-файлов для обработки посылок" />

      <div className="flex flex-col gap-6 p-6">
        {/* Import Cards */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {importTypes.map((imp) => (
            <Card key={imp.title}>
              <CardHeader>
                <CardTitle className="text-base">{imp.title}</CardTitle>
                <CardDescription>{imp.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 rounded-lg border-2 border-dashed border-border bg-muted/30 p-6 text-center">
                  <Upload className="mx-auto size-8 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Перетащите .xlsx файл сюда
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground/60">
                    {imp.columns}
                  </p>
                </div>
                <Button className="w-full gap-2">
                  <FileSpreadsheet className="size-4" />
                  Загрузить файл
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Imports */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Последние импорты</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {recentImports.map((imp, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileSpreadsheet className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{imp.file}</p>
                    <p className="text-xs text-muted-foreground">
                      {imp.processed} обработано
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {imp.errors === 0 ? (
                      <Badge variant="secondary" className="bg-primary/10 text-primary gap-1 text-xs">
                        <CheckCircle2 className="size-3" />
                        Успешно
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-chart-4/15 text-chart-4 gap-1 text-xs">
                        <AlertTriangle className="size-3" />
                        {imp.errors} ошибок
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{imp.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
