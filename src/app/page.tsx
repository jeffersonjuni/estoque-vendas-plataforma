import { AppShell } from '@/components/layout/app-shell';
import { PageContainer } from '@/components/layout/page-container';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';

export default function Home() {
  return (
    <AppShell>
      <PageContainer>
        <PageHeader
          title="Dashboard"
          description="Visão inicial da plataforma de controle de estoque e vendas."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Section>
            <h3 className="text-sm font-medium text-muted-foreground">
              Produtos cadastrados
            </h3>
            <p className="mt-3 text-3xl font-bold text-foreground">0</p>
          </Section>

          <Section>
            <h3 className="text-sm font-medium text-muted-foreground">
              Itens em estoque
            </h3>
            <p className="mt-3 text-3xl font-bold text-foreground">0</p>
          </Section>

          <Section>
            <h3 className="text-sm font-medium text-muted-foreground">
              Vendas registradas
            </h3>
            <p className="mt-3 text-3xl font-bold text-foreground">0</p>
          </Section>

          <Section>
            <h3 className="text-sm font-medium text-muted-foreground">
              Faturamento total
            </h3>
            <p className="mt-3 text-3xl font-bold text-foreground">R$ 0,00</p>
          </Section>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Section className="xl:col-span-2">
            <h3 className="text-lg font-semibold text-foreground">
              Resumo geral
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Aqui ficarão os gráficos, indicadores e movimentações recentes do
              sistema.
            </p>
          </Section>

          <Section>
            <h3 className="text-lg font-semibold text-foreground">
              Atividade recente
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Aqui serão exibidas as últimas ações realizadas na plataforma.
            </p>
          </Section>
        </div>
      </PageContainer>
    </AppShell>
  );
}