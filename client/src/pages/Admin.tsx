import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Shield, Users, UserCheck, UserX, Crown, Map, Plane, Store, Edit, Trash2 } from "lucide-react";
import RegionEditForm from "@/components/RegionEditForm";

interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface Region {
  id: number;
  name: string;
  nameKa: string;
  nameRu: string;
  description: string;
  descriptionKa: string;
  descriptionRu: string;
  slug: string;
  featured: boolean;
  imageUrl: string;
}

interface Tour {
  id: number;
  title: string;
  titleKa: string;
  titleRu: string;
  description: string;
  descriptionKa: string;
  descriptionRu: string;
  price: number;
  duration: string;
  regionId: number;
  category: string;
  featured: boolean;
  imageUrl: string;
}

interface Product {
  id: number;
  name: string;
  nameKa: string;
  nameRu: string;
  description: string;
  descriptionKa: string;
  descriptionRu: string;
  price: number;
  category: string;
  featured: boolean;
  imageUrl: string;
  inStock: boolean;
}

export default function Admin() {
  const { user, isAdmin, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("users");
  const { toast } = useToast();

  // State for different data types
  const [users, setUsers] = useState<User[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Loading states
  const [usersLoading, setUsersLoading] = useState(true);
  const [regionsLoading, setRegionsLoading] = useState(false);
  const [toursLoading, setToursLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);

  // Error states
  const [error, setError] = useState("");

  // Edit states
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
      return;
    }
    
    if (!isAdmin) {
      setLocation("/");
      return;
    }
  }, [isAuthenticated, isAdmin, setLocation]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const usersData = await response.json();
        setUsers(usersData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch users";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setUsersLoading(false);
      }
    };

    if (isAuthenticated && isAdmin) {
      fetchUsers();
    }
  }, [isAuthenticated, isAdmin, toast]);

  // Fetch regions
  const fetchRegions = async () => {
    if (!regionsLoading) {
      setRegionsLoading(true);
      try {
        const response = await fetch("/api/regions");
        if (!response.ok) throw new Error("Failed to fetch regions");
        const data = await response.json();
        setRegions(data);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch regions",
          variant: "destructive",
        });
      } finally {
        setRegionsLoading(false);
      }
    }
  };

  // Fetch tours
  const fetchTours = async () => {
    if (!toursLoading) {
      setToursLoading(true);
      try {
        const response = await fetch("/api/tours");
        if (!response.ok) throw new Error("Failed to fetch tours");
        const data = await response.json();
        setTours(data);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch tours",
          variant: "destructive",
        });
      } finally {
        setToursLoading(false);
      }
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    if (!productsLoading) {
      setProductsLoading(true);
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch products",
          variant: "destructive",
        });
      } finally {
        setProductsLoading(false);
      }
    }
  };

  // Handle tab change and fetch data when needed
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "regions" && regions.length === 0) {
      fetchRegions();
    } else if (value === "tours" && tours.length === 0) {
      fetchTours();
    } else if (value === "products" && products.length === 0) {
      fetchProducts();
    }
  };

  // User management functions
  const updateUserRole = async (userId: string, role: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      const updatedUser = await response.json();
      setUsers(users.map(u => u.id === userId ? updatedUser : u));
      
      toast({
        title: "Success",
        description: `User role updated to ${role}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update role";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const updateUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      const updatedUser = await response.json();
      setUsers(users.map(u => u.id === userId ? updatedUser : u));
      
      toast({
        title: "Success",
        description: `User ${isActive ? 'activated' : 'deactivated'}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update status";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Region editing functions
  const handleEditRegion = (region: Region) => {
    setEditingRegion(region);
    setIsEditModalOpen(true);
  };

  const handleSaveRegion = async (regionId: number, data: any) => {
    try {
      const response = await fetch(`/api/admin/regions/${regionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update region");
      }

      const updatedRegion = await response.json();
      setRegions(regions.map(r => r.id === regionId ? updatedRegion : r));
      
      toast({
        title: "Success",
        description: "Region updated successfully",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update region";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingRegion(null);
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="mr-3 h-8 w-8 text-georgian-wine" />
            Admin Panel
          </h1>
          <p className="mt-2 text-gray-600">Manage your Georgian Heritage website</p>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="regions" className="flex items-center">
              <Map className="mr-2 h-4 w-4" />
              Regions
            </TabsTrigger>
            <TabsTrigger value="tours" className="flex items-center">
              <Plane className="mr-2 h-4 w-4" />
              Tours
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center">
              <Store className="mr-2 h-4 w-4" />
              Store
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  User Management
                </CardTitle>
                <CardDescription>
                  Manage user accounts, roles, and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="text-gray-500">Loading users...</div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Username</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((userData) => (
                          <TableRow key={userData.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 bg-georgian-wine rounded-full flex items-center justify-center">
                                  <span className="text-white text-sm font-medium">
                                    {userData.firstName?.charAt(0) || userData.username.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {userData.firstName || userData.lastName
                                      ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim()
                                      : userData.username}
                                  </div>
                                  {userData.role === 'admin' && (
                                    <Crown className="inline h-3 w-3 text-yellow-500" />
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{userData.username}</TableCell>
                            <TableCell>{userData.email}</TableCell>
                            <TableCell>
                              <Select
                                value={userData.role}
                                onValueChange={(role) => updateUserRole(userData.id, role)}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={userData.isActive}
                                  onCheckedChange={(checked) => updateUserStatus(userData.id, checked)}
                                />
                                <Badge variant={userData.isActive ? "default" : "secondary"}>
                                  {userData.isActive ? (
                                    <>
                                      <UserCheck className="mr-1 h-3 w-3" />
                                      Active
                                    </>
                                  ) : (
                                    <>
                                      <UserX className="mr-1 h-3 w-3" />
                                      Inactive
                                    </>
                                  )}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-gray-500">
                              {new Date(userData.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regions Tab */}
          <TabsContent value="regions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Map className="mr-2 h-5 w-5" />
                  Regions Management
                </CardTitle>
                <CardDescription>
                  Manage Georgian ethnographic regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {regionsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="text-gray-500">Loading regions...</div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Image</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Georgian Name</TableHead>
                          <TableHead>Russian Name</TableHead>
                          <TableHead>Slug</TableHead>
                          <TableHead>Featured</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {regions.map((region) => (
                          <TableRow key={region.id}>
                            <TableCell>
                              <img 
                                src={region.imageUrl} 
                                alt={region.name}
                                className="h-12 w-12 object-cover rounded"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{region.name}</TableCell>
                            <TableCell>{region.nameKa}</TableCell>
                            <TableCell>{region.nameRu}</TableCell>
                            <TableCell className="font-mono text-sm">{region.slug}</TableCell>
                            <TableCell>
                              <Badge variant={region.featured ? "default" : "secondary"}>
                                {region.featured ? "Featured" : "Standard"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditRegion(region)}
                                  data-testid={`edit-region-${region.id}`}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tours Tab */}
          <TabsContent value="tours">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plane className="mr-2 h-5 w-5" />
                  Tours Management
                </CardTitle>
                <CardDescription>
                  Manage tour packages and experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                {toursLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="text-gray-500">Loading tours...</div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Image</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Region</TableHead>
                          <TableHead>Featured</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tours.map((tour) => (
                          <TableRow key={tour.id}>
                            <TableCell>
                              <img 
                                src={tour.imageUrl} 
                                alt={tour.title}
                                className="h-12 w-12 object-cover rounded"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{tour.title}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{tour.category}</Badge>
                            </TableCell>
                            <TableCell>{tour.duration}</TableCell>
                            <TableCell className="font-medium">${tour.price}</TableCell>
                            <TableCell>{regions.find(r => r.id === tour.regionId)?.name || 'Unknown'}</TableCell>
                            <TableCell>
                              <Badge variant={tour.featured ? "default" : "secondary"}>
                                {tour.featured ? "Featured" : "Standard"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Store className="mr-2 h-5 w-5" />
                  Store Management
                </CardTitle>
                <CardDescription>
                  Manage products and inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                {productsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="text-gray-500">Loading products...</div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Image</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Featured</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <img 
                                src={product.imageUrl} 
                                alt={product.name}
                                className="h-12 w-12 object-cover rounded"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{product.category}</Badge>
                            </TableCell>
                            <TableCell className="font-medium">${product.price}</TableCell>
                            <TableCell>
                              <Badge variant={product.inStock ? "default" : "destructive"}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={product.featured ? "default" : "secondary"}>
                                {product.featured ? "Featured" : "Standard"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Region Edit Modal */}
        <RegionEditForm
          region={editingRegion}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSave={handleSaveRegion}
        />
      </div>
    </div>
  );
}