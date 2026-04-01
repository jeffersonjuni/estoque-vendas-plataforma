import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

type PageUnderConstructionProps = {
  title: string;
  description: string;
};

export function PageUnderConstruction({
  title,
  description,
}: PageUnderConstructionProps) {
  return (
    <PageContainer>
      <PageHeader title={title} description={description} />

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title={`${title} em desenvolvimento`}
            description="Esta área já foi estruturada e será evoluída nas próximas fases do projeto."
          />
          <CardContent className="space-y-4">
            <Badge variant="warning">Em desenvolvimento</Badge>

            <p className="text-sm leading-7 text-muted-foreground">
              Esta página já está integrada à estrutura oficial da plataforma,
              seguindo o mesmo padrão visual, organizacional e responsivo
              definido nas fases iniciais do projeto.
            </p>

            <p className="text-sm leading-7 text-muted-foreground">
              Nas próximas etapas, este módulo receberá suas funcionalidades
              reais, integrações com banco de dados, regras de negócio e fluxos
              operacionais do sistema.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="Status do módulo"
            description="Base pronta para evolução"
          />
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-sm font-medium text-foreground">Estrutura</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Página criada e integrada
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-sm font-medium text-foreground">UI Global</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Aplicada com sucesso
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-sm font-medium text-foreground">
                Próxima etapa
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Implementação funcional
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}