import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save, X } from "lucide-react";

const regionEditSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameKa: z.string().optional(),
  nameRu: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  descriptionKa: z.string().optional(),
  descriptionRu: z.string().optional(),
  imageUrl: z.string().url("Please enter a valid image URL"),
  mainAttraction: z.string().min(1, "Main attraction is required"),
  location: z.string().optional(),
  locationKa: z.string().optional(),
  locationRu: z.string().optional(),
  bestTimeToVisit: z.string().optional(),
  bestTimeToVisitKa: z.string().optional(),
  bestTimeToVisitRu: z.string().optional(),
  climate: z.string().optional(),
  climateKa: z.string().optional(),
  climateRu: z.string().optional(),
  howToReach: z.string().optional(),
  howToReachKa: z.string().optional(),
  howToReachRu: z.string().optional(),
  slug: z.string().min(1, "Slug is required"),
  featured: z.boolean(),
});

type RegionEditFormData = z.infer<typeof regionEditSchema>;

interface Region {
  id: number;
  name: string;
  nameKa?: string | null;
  nameRu?: string | null;
  description: string;
  descriptionKa?: string | null;
  descriptionRu?: string | null;
  imageUrl: string;
  mainAttraction: string;
  location?: string | null;
  locationKa?: string | null;
  locationRu?: string | null;
  bestTimeToVisit?: string | null;
  bestTimeToVisitKa?: string | null;
  bestTimeToVisitRu?: string | null;
  climate?: string | null;
  climateKa?: string | null;
  climateRu?: string | null;
  howToReach?: string | null;
  howToReachKa?: string | null;
  howToReachRu?: string | null;
  slug: string;
  featured: boolean;
}

interface RegionEditFormProps {
  region: Region | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (regionId: number, data: RegionEditFormData) => Promise<void>;
}

export default function RegionEditForm({ region, isOpen, onClose, onSave }: RegionEditFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegionEditFormData>({
    resolver: zodResolver(regionEditSchema),
    defaultValues: {
      name: "",
      nameKa: "",
      nameRu: "",
      description: "",
      descriptionKa: "",
      descriptionRu: "",
      imageUrl: "",
      mainAttraction: "",
      location: "",
      locationKa: "",
      locationRu: "",
      bestTimeToVisit: "",
      bestTimeToVisitKa: "",
      bestTimeToVisitRu: "",
      climate: "",
      climateKa: "",
      climateRu: "",
      howToReach: "",
      howToReachKa: "",
      howToReachRu: "",
      slug: "",
      featured: false,
    },
  });

  // Update form when region changes
  useEffect(() => {
    if (region) {
      form.reset({
        name: region.name,
        nameKa: region.nameKa || "",
        nameRu: region.nameRu || "",
        description: region.description,
        descriptionKa: region.descriptionKa || "",
        descriptionRu: region.descriptionRu || "",
        imageUrl: region.imageUrl,
        mainAttraction: region.mainAttraction,
        location: region.location || "",
        locationKa: region.locationKa || "",
        locationRu: region.locationRu || "",
        bestTimeToVisit: region.bestTimeToVisit || "",
        bestTimeToVisitKa: region.bestTimeToVisitKa || "",
        bestTimeToVisitRu: region.bestTimeToVisitRu || "",
        climate: region.climate || "",
        climateKa: region.climateKa || "",
        climateRu: region.climateRu || "",
        howToReach: region.howToReach || "",
        howToReachKa: region.howToReachKa || "",
        howToReachRu: region.howToReachRu || "",
        slug: region.slug,
        featured: region.featured,
      });
    }
  }, [region, form]);

  const onSubmit = async (data: RegionEditFormData) => {
    if (!region) return;
    
    setLoading(true);
    try {
      await onSave(region.id, data);
      toast({
        title: "Success",
        description: "Region updated successfully",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update region",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!region) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Region: {region.name}</DialogTitle>
          <DialogDescription>
            Update region information including descriptions in multiple languages
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="english" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="english">English</TabsTrigger>
                <TabsTrigger value="georgian">Georgian</TabsTrigger>
                <TabsTrigger value="russian">Russian</TabsTrigger>
              </TabsList>

              {/* English Tab */}
              <TabsContent value="english" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mainAttraction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Attraction</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bestTimeToVisit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Best Time to Visit</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="climate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Climate</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="howToReach"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How to Reach</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
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
                      <FormLabel>Name (Georgian)</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="locationKa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (Georgian)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bestTimeToVisitKa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Best Time to Visit (Georgian)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="climateKa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Climate (Georgian)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="howToReachKa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How to Reach (Georgian)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
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
                      <FormLabel>Name (Russian)</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="locationRu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (Russian)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bestTimeToVisitRu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Best Time to Visit (Russian)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="climateRu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Climate (Russian)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="howToReachRu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How to Reach (Russian)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Featured Region</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}