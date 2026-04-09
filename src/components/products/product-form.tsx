"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/services/product/create-product-client";
import { createProductSchema } from "@/lib/validations/product"; // 

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ProductForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });

   
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return; 

    setErrors({});
    setSuccess("");

    const parsed = createProductSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      parsed.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      await createProduct(parsed.data);

      setSuccess("Produto cadastrado com sucesso!");

      // limpa form
      setForm({
        name: "",
        description: "",
        sku: "",
        category: "",
        price: "",
        stock: "",
      });

      // redireciona
      setTimeout(() => {
        router.push("/produtos");
      }, 1200);

    } catch (err: any) {
      setErrors({ global: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6 space-y-4 max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4">

        {errors.global && (
          <p className="text-red-500 text-sm">{errors.global}</p>
        )}

        {success && (
          <p className="text-green-500 text-sm">{success}</p>
        )}

        <Input
          name="name"
          placeholder="Nome do produto"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        <Input
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
        />

        <Input
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
        />

        <Input
          name="category"
          placeholder="Categoria"
          value={form.category}
          onChange={handleChange}
        />

        <Input
          name="price"
          type="number"
          step="0.01"
          placeholder="Preço"
          value={form.price}
          onChange={handleChange}
        />
        {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}

        <Input
          name="stock"
          type="number"
          placeholder="Estoque"
          value={form.stock}
          onChange={handleChange}
        />
        {errors.stock && <p className="text-red-500 text-xs">{errors.stock}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Salvando..." : "Cadastrar Produto"}
        </Button>
      </form>
    </Card>
  );
}