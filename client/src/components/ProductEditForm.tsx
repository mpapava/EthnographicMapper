import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

// Product type from schema
type Product = {
  id: number;
  name: string;
  nameKa: string | null;
  nameRu: string | null;
  description: string;
  descriptionKa: string | null;
  descriptionRu: string | null;
  price: string;
  category: string;
  imageUrl: string;
  inStock: boolean | null;
  featured: boolean | null;
};

// Product edit schema
const productEditSchema = z.object({
  // English fields
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  
  // Georgian fields
  nameKa: z.string().optional().or(z.literal("")),
  descriptionKa: z.string().optional().or(z.literal("")),
  
  // Russian fields
  nameRu: z.string().optional().or(z.literal("")),
  descriptionRu: z.string().optional().or(z.literal("")),
  
  // Other fields
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Invalid image URL"),
  inStock: z.boolean(),
  featured: z.boolean(),
});

type ProductEditData = z.infer<typeof productEditSchema>;

interface ProductEditFormProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (productId: number, data: ProductEditData) => Promise<void>;
}

export function ProductEditForm({ product, isOpen, onClose, onSave }: ProductEditFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductEditData>({
    resolver: zodResolver(productEditSchema),
    defaultValues: {
      name: product?.name || "",
      nameKa: product?.nameKa || "",
      nameRu: product?.nameRu || "",
      description: product?.description || "",
      descriptionKa: product?.descriptionKa || "",
      descriptionRu: product?.descriptionRu || "",
      price: product?.price || "",
      category: product?.category || "food",
      imageUrl: product?.imageUrl || "",
      inStock: product?.inStock ?? true,
      featured: product?.featured ?? false,
    },
  });

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name || "",
        nameKa: product.nameKa || "",
        nameRu: product.nameRu || "",
        description: product.description || "",
        descriptionKa: product.descriptionKa || "",
        descriptionRu: product.descriptionRu || "",
        price: product.price || "",
        category: product.category || "food",
        imageUrl: product.imageUrl || "",
        inStock: product.inStock ?? true,
        featured: product.featured ?? false,
      });
    }
  }, [product, form]);

  const handleSubmit = async (data: ProductEditData) => {
    if (!product) return;

    setIsLoading(true);
    try {
      await onSave(product.id, data);
      onClose();
    } catch (error) {
      console.error("Failed to save product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product: {product.name}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Tabs defaultValue="english" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="english">English</TabsTrigger>
                <TabsTrigger value="georgian">Georgian</TabsTrigger>
                <TabsTrigger value="russian">Russian</TabsTrigger>
              </TabsList>

              {/* English Tab */}
              <TabsContent value="english" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name *</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="wine">Wine</SelectItem>
                            <SelectItem value="food">Food</SelectItem>
                            <SelectItem value="crafts">Crafts</SelectItem>
                            <SelectItem value="souvenirs">Souvenirs</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="min-h-[120px]" 
                          {...field} 
                          data-testid="textarea-description" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* Georgian Tab */}
              <TabsContent value="georgian" className="space-y-4">
                <FormField
                  control={form.control}
                  name="nameKa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name (Georgian)</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-nameKa" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descriptionKa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Georgian)</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="min-h-[120px]" 
                          {...field} 
                          data-testid="textarea-descriptionKa" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* Russian Tab */}
              <TabsContent value="russian" className="space-y-4">
                <FormField
                  control={form.control}
                  name="nameRu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name (Russian)</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-nameRu" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descriptionRu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Russian)</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="min-h-[120px]" 
                          {...field} 
                          data-testid="textarea-descriptionRu" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            {/* Product Details Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (USD) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          {...field} 
                          data-testid="input-price" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL *</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-imageUrl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="inStock"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-inStock"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        In Stock
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-featured"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Featured Product
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Preview Section */}
            {product.imageUrl && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Current Product Image</h3>
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="h-32 w-32 object-cover rounded-lg border"
                />
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                data-testid="button-save-product"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}