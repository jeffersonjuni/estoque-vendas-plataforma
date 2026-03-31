import { AppShell } from '@/components/layout/app-shell';
import { PageContainer } from '@/components/layout/page-container';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';

export default function RelatoriosPage() {
  return (
    <AppShell>
      <PageContainer>
        <PageHeader
          title="Relatórios"
          description="Acompanhe indicadores e dados consolidados do sistema."
        />

        <Section>
          <p className="text-sm text-muted-foreground">
            Página em construção.
          </p>
        </Section>
      </PageContainer>
    </AppShell>
  );
}