'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PageContainer } from '@/components/layout/page-container';
import { PageHeader } from '@/components/layout/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { Modal } from '@/components/ui/modal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/components/ui/table';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <AppShell>
      <PageContainer>
        <PageHeader
          title="Dashboard"
          description="Visualização dos componentes base da plataforma."
          action={<Button onClick={() => setOpenModal(true)}>Abrir modal</Button>}
        />

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader
              title="Botões e Badges"
              description="Variações visuais reutilizáveis."
            />
            <CardContent className="flex flex-wrap gap-3">
              <Button>Primário</Button>
              <Button variant="secondary">Secundário</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>

              <Badge>Default</Badge>
              <Badge variant="success">Sucesso</Badge>
              <Badge variant="warning">Atenção</Badge>
              <Badge variant="danger">Erro</Badge>
              <Badge variant="outline">Outline</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Formulário"
              description="Input base reutilizável."
            />
            <CardContent className="space-y-4">
              <Input
                id="produto"
                label="Nome do produto"
                placeholder="Digite o nome do produto"
              />
              <Input
                id="quantidade"
                label="Quantidade"
                placeholder="Digite a quantidade"
              />
              <Input
                id="erro"
                label="Campo com erro"
                placeholder="Exemplo com validação"
                error="Este campo é obrigatório."
              />
            </CardContent>
          </Card>

          <Card className="xl:col-span-2">
            <CardHeader
              title="Tabela"
              description="Estrutura base para listagens."
            />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Produto</TableHeaderCell>
                    <TableHeaderCell>Categoria</TableHeaderCell>
                    <TableHeaderCell>Estoque</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>Notebook Dell</TableCell>
                    <TableCell>Eletrônicos</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>
                      <Badge variant="success">Disponível</Badge>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Mouse Gamer</TableCell>
                    <TableCell>Acessórios</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>
                      <Badge variant="warning">Baixo</Badge>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Teclado Mecânico</TableCell>
                    <TableCell>Acessórios</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>
                      <Badge variant="danger">Sem estoque</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Loader"
              description="Indicador visual de carregamento."
            />
            <CardContent className="flex items-center gap-4">
              <Loader size="sm" />
              <Loader size="md" />
              <Loader size="lg" />
            </CardContent>
          </Card>
        </div>

        <Modal
          open={openModal}
          title="Confirmar ação"
          description="Este é o modal base reutilizável do sistema."
          onClose={() => setOpenModal(false)}
          onConfirm={() => setOpenModal(false)}
          confirmText="Confirmar"
          cancelText="Cancelar"
        >
          <p className="text-sm text-muted-foreground">
            Você poderá reutilizar este modal para exclusão, confirmação de
            cadastro, atualização e outras ações importantes.
          </p>
        </Modal>
      </PageContainer>
    </AppShell>
  );
}