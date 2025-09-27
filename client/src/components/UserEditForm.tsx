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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

// User type from schema
type User = {
  id: string;
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  role: string | null;
  isActive: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

// User edit schema
const userEditSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  profileImageUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  role: z.enum(["user", "admin"]),
  isActive: z.boolean(),
  newPassword: z.string().optional().or(z.literal("")),
});

type UserEditData = z.infer<typeof userEditSchema>;

interface UserEditFormProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userId: string, data: UserEditData) => Promise<void>;
}

export function UserEditForm({ user, isOpen, onClose, onSave }: UserEditFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserEditData>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      profileImageUrl: user?.profileImageUrl || "",
      role: (user?.role as "user" | "admin") || "user",
      isActive: user?.isActive ?? true,
      newPassword: "",
    },
  });

  // Reset form when user changes
  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        profileImageUrl: user.profileImageUrl || "",
        role: (user.role as "user" | "admin") || "user",
        isActive: user.isActive ?? true,
        newPassword: "",
      });
    }
  }, [user, form]);

  const handleSubmit = async (data: UserEditData) => {
    if (!user) return;

    setIsLoading(true);
    try {
      await onSave(user.id, data);
      onClose();
    } catch (error) {
      console.error("Failed to save user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User: {user.username}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username *</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-firstName" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-lastName" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Profile Image URL */}
            <FormField
              control={form.control}
              name="profileImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/profile.jpg" 
                      {...field} 
                      data-testid="input-profileImageUrl" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Active Status */}
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0 pt-6">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="switch-isActive"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Account Active
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="Enter new password to change it"
                      {...field} 
                      data-testid="input-newPassword" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* User Info */}
            <div className="text-sm text-gray-500 space-y-1">
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Created:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Last Updated:</strong> {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}</p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                data-testid="button-save-user"
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