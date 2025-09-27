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

// Tour type from schema
type Tour = {
  id: number;
  title: string;
  titleKa: string | null;
  titleRu: string | null;
  description: string;
  descriptionKa: string | null;
  descriptionRu: string | null;
  price: string;
  duration: string;
  maxPeople: number;
  includes: string;
  includesKa: string | null;
  includesRu: string | null;
  category: string;
  imageUrl: string;
  regionId: number | null;
  featured: boolean | null;
};

// Region type for dropdown
type Region = {
  id: number;
  name: string;
};

// Tour edit schema
const tourEditSchema = z.object({
  // English fields
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  includes: z.string().min(1, "Includes is required"),
  
  // Georgian fields
  titleKa: z.string().optional().or(z.literal("")),
  descriptionKa: z.string().optional().or(z.literal("")),
  includesKa: z.string().optional().or(z.literal("")),
  
  // Russian fields
  titleRu: z.string().optional().or(z.literal("")),
  descriptionRu: z.string().optional().or(z.literal("")),
  includesRu: z.string().optional().or(z.literal("")),
  
  // Other fields
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  maxPeople: z.number().min(1, "Max people must be at least 1"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Invalid image URL"),
  regionId: z.number().optional(),
  featured: z.boolean(),
});

type TourEditData = z.infer<typeof tourEditSchema>;

interface TourEditFormProps {
  tour: Tour | null;
  regions: Region[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (tourId: number, data: TourEditData) => Promise<void>;
}

export function TourEditForm({ tour, regions, isOpen, onClose, onSave }: TourEditFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TourEditData>({
    resolver: zodResolver(tourEditSchema),
    defaultValues: {
      title: tour?.title || "",
      titleKa: tour?.titleKa || "",
      titleRu: tour?.titleRu || "",
      description: tour?.description || "",
      descriptionKa: tour?.descriptionKa || "",
      descriptionRu: tour?.descriptionRu || "",
      includes: tour?.includes || "",
      includesKa: tour?.includesKa || "",
      includesRu: tour?.includesRu || "",
      price: tour?.price || "",
      duration: tour?.duration || "",
      maxPeople: tour?.maxPeople || 1,
      category: tour?.category || "cultural",
      imageUrl: tour?.imageUrl || "",
      regionId: tour?.regionId || undefined,
      featured: tour?.featured ?? false,
    },
  });

  // Reset form when tour changes
  useEffect(() => {
    if (tour) {
      form.reset({
        title: tour.title || "",
        titleKa: tour.titleKa || "",
        titleRu: tour.titleRu || "",
        description: tour.description || "",
        descriptionKa: tour.descriptionKa || "",
        descriptionRu: tour.descriptionRu || "",
        includes: tour.includes || "",
        includesKa: tour.includesKa || "",
        includesRu: tour.includesRu || "",
        price: tour.price || "",
        duration: tour.duration || "",
        maxPeople: tour.maxPeople || 1,
        category: tour.category || "cultural",
        imageUrl: tour.imageUrl || "",
        regionId: tour.regionId || undefined,
        featured: tour.featured ?? false,
      });
    }
  }, [tour, form]);

  const handleSubmit = async (data: TourEditData) => {
    if (!tour) return;

    setIsLoading(true);
    try {
      await onSave(tour.id, data);
      onClose();
    } catch (error) {
      console.error("Failed to save tour:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  if (!tour) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Tour: {tour.title}</DialogTitle>
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
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-title" />
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
                            <SelectItem value="culinary">Culinary</SelectItem>
                            <SelectItem value="cultural">Cultural</SelectItem>
                            <SelectItem value="adventure">Adventure</SelectItem>
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
                          className="min-h-[100px]" 
                          {...field} 
                          data-testid="textarea-description" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="includes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What's Included *</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="min-h-[100px]" 
                          {...field} 
                          data-testid="textarea-includes" 
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
                  name="titleKa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (Georgian)</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-titleKa" />
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
                          className="min-h-[100px]" 
                          {...field} 
                          data-testid="textarea-descriptionKa" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="includesKa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What's Included (Georgian)</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="min-h-[100px]" 
                          {...field} 
                          data-testid="textarea-includesKa" 
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
                  name="titleRu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (Russian)</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-titleRu" />
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
                          className="min-h-[100px]" 
                          {...field} 
                          data-testid="textarea-descriptionRu" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="includesRu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What's Included (Russian)</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="min-h-[100px]" 
                          {...field} 
                          data-testid="textarea-includesRu" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            {/* Details Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Tour Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 3 days, 5 hours" 
                          {...field} 
                          data-testid="input-duration" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxPeople"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max People *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          data-testid="input-maxPeople" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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

                <FormField
                  control={form.control}
                  name="regionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)}
                        value={field.value?.toString() || ""}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-regionId">
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">No region</SelectItem>
                          {regions.map((region) => (
                            <SelectItem key={region.id} value={region.id.toString()}>
                              {region.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4">
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
                        Featured Tour
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                data-testid="button-save-tour"
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