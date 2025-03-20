"use client";

import { createUpdateProduct } from "@/actions/admin/products/create-update-product";
import { deleteImage } from "@/actions/admin/products/delete-image";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { Product } from "@/interfaces";
import { ProductImage as ProductImageInterface, Size } from "@/interfaces/product.interface";
import { toast } from "@pheralb/toast";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImageInterface[] };
  categories: { id: string; name: string }[];
}

interface FormInputs {
  title: string;
  description: string;
  gender: "men" | "women" | "kid" | "unisex";
  inStock: number;
  price: number;
  sizes: string[];
  tags: string;
  categoryId: string;
  slug: string;

  //todo: images
  images?: FileList
}

const validSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {

  const router = useRouter()

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(","),
      images: undefined
    },
  });

  // El watch me permite re-renderizar el form cuando cambie el campo que le diga, en este caso "sizes"
  watch("sizes");

  const onSizeChanged = (newSize: string) => {
    const sizes = new Set(getValues("sizes"));
    sizes.has(newSize) ? sizes.delete(newSize) : sizes.add(newSize);
    setValue("sizes", Array.from(sizes));
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }
    formData.append("title", productToSave.title);
    formData.append("description", productToSave.description);
    formData.append("gender", productToSave.gender);
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("price", productToSave.price.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("slug", productToSave.slug);

    if(images){
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
   
    }

    const { ok, product: newProduct } = await createUpdateProduct(formData);

    if(!ok){
      toast.error({
        text: "Error al actualizar, no se pudo completar la acción"
      })
      return
    }

    toast.success({
      text: "Producto actualizado correctamente"
    })

    router.replace(`/admin/product/${newProduct?.slug}`)
  };

  return (
    <form
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200 resize-y max-h-72 min-h-40"
            {...register("description")}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Precio</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Etiquetas</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Género</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender", { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories?.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {validSizes.map((size) => (
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  "flex items-center justify-center w-10 h-10 mr-2 border rounded-md cursor-pointer hover:border-2 hover:brightness-95 transition-all duration-200",
                  {
                    "bg-blue-500 text-white": getValues("sizes")?.includes(
                      size as Size
                    ),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
              {...register("images")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.ProductImage?.map((img) => (
              <div
                key={img.id}
                className="hover:shadow-2xl hover:scale-105 transition-all duration-300 max-md:flex max-md:w-3/4"
              >
                <ProductImage
                  src={img.url}
                  alt={product.title ?? "Product image"}
                  className="md:rounded-t-md shadow-xl max-md:rounded-l"
                  width={300}
                  height={300}
                />
                <button
                  type="button"
                  onClick={() => deleteImage(img.id, img.url)}
                  className="btn-danger md:w-full md:rounded-t-none md:rounded-b-md max-md:rounded-r shadow-xl"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
