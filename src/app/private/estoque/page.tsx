import { AppShell } from '@/components/layout/app-shell';
import { PageContainer } from '@/components/layout/page-container';
import { PageHeader } from '@/components/layout/page-header';
import { Section } from '@/components/layout/section';

export default function EstoquePage() {
  return (
    <AppShell>
      <PageContainer>
        <PageHeader
          title="Estoque"
          description="Acompanhe a movimentação e disponibilidade dos itens."
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