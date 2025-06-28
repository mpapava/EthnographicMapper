import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function ContactForm() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message! We will get back to you soon.",
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName" className="block text-sm font-semibold georgian-wine mb-2">
                {getTranslation('contact.firstName', language)}
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-georgian-wine focus:border-transparent"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="block text-sm font-semibold georgian-wine mb-2">
                {getTranslation('contact.lastName', language)}
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-georgian-wine focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="block text-sm font-semibold georgian-wine mb-2">
              {getTranslation('contact.email', language)}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-georgian-wine focus:border-transparent"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="block text-sm font-semibold georgian-wine mb-2">
              {getTranslation('contact.phone', language)}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-georgian-wine focus:border-transparent"
            />
          </div>

          <div>
            <Label htmlFor="interest" className="block text-sm font-semibold georgian-wine mb-2">
              Area of Interest
            </Label>
            <Select value={formData.interest} onValueChange={(value) => handleChange('interest', value)}>
              <SelectTrigger className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-georgian-wine focus:border-transparent">
                <SelectValue placeholder="Select your interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wine-tours">Wine Tours</SelectItem>
                <SelectItem value="culinary">Culinary Experiences</SelectItem>
                <SelectItem value="cultural">Cultural Heritage Tours</SelectItem>
                <SelectItem value="adventure">Adventure Tourism</SelectItem>
                <SelectItem value="custom">Custom Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message" className="block text-sm font-semibold georgian-wine mb-2">
              {getTranslation('contact.message', language)}
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-georgian-wine focus:border-transparent resize-none"
              placeholder="Tell us about your ideal Georgian experience..."
              required
            />
          </div>

          <Button
            type="submit"
            disabled={contactMutation.isPending}
            className="w-full bg-georgian-wine hover:bg-georgian-wine/90 text-white py-4 text-lg font-semibold"
          >
            {contactMutation.isPending ? 'Sending...' : getTranslation('contact.submit', language)}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
