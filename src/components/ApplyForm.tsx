import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toast } from "@/components/ui/toast-notification";
import { Loader2 } from "lucide-react";

// Import the Airtable service
import { formSchema, submitToAirtable, type FormValues } from "@/lib/airtable";

interface ApplyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplyForm({ open, onOpenChange }: ApplyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({
    visible: false,
    type: "success",
    message: "",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      zipCode: "",
      industry: "",
      purpose: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const result = await submitToAirtable(values);
      
      if (result.success) {
        // Show success message
        setToast({
          visible: true,
          type: "success",
          message: result.message,
        });
        
        // Reset form and close dialog after a delay
        setTimeout(() => {
          form.reset();
          onOpenChange(false);
        }, 1500);
      } else {
        // Show error message
        setToast({
          visible: true,
          type: "error",
          message: result.message,
        });
      }
    } catch (error) {
      // Handle unexpected errors
      setToast({
        visible: true,
        type: "error",
        message: error instanceof Error 
          ? `An error occurred: ${error.message}` 
          : "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">Apply Now</DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill out the form below to start the application process.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(123) 456-7890"
                          {...field}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Industry</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Technology, Real Estate, etc."
                          {...field}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-gray-300">Business Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="borrower" className="border-gray-600 text-[#2EE697]" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer text-white">
                            Borrower
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="lender" className="border-gray-600 text-[#2EE697]" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer text-white">
                            Lender
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="financingAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Target Financing Amount</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select an amount range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="<$250K">&lt;$250K</SelectItem>
                        <SelectItem value="$250K–$1M">$250K–$1M</SelectItem>
                        <SelectItem value="$1M–$5M">$1M–$5M</SelectItem>
                        <SelectItem value="$5M+">$5M+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Purpose of Financing</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your financing needs..."
                        className="min-h-24 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-[#2EE697] text-black hover:bg-[#2EE697]/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Toast Notification */}
      {toast.visible && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </>
  );
} 