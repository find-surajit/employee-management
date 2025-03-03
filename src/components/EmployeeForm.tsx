import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


// Define validation schema using Zod
const employeeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional().refine((val) => !val || /^[0-9]{10,15}$/.test(val), {
    message: "Phone number must be 10-15 digits",
  }),
  role: z.enum(["Developer", "Designer", "Manager"], {
    errorMap: () => ({ message: "Invalid role selected" }),
  }),
  joiningDate: z.string().refine((val) => new Date(val) <= new Date(), {
    message: "Joining date must be today or in the past",
  }),
});

// Define TypeScript type for form data
type EmployeeFormData = z.infer<typeof employeeSchema>;

const EmployeeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = (data: EmployeeFormData) => {
    console.log("Form Submitted:", data);
    alert("Employee added successfully!");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block font-medium">Name:</label>
          <input {...register("name")} className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block font-medium">Email:</label>
          <input {...register("email")} type="email" className="w-full border p-2 rounded" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block font-medium">Phone (Optional):</label>
          <input {...register("phone")} type="text" className="w-full border p-2 rounded" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Role Selection */}
        <div>
          <label className="block font-medium">Role:</label>
          <select {...register("role")} className="w-full border p-2 rounded">
            <option value="">Select Role</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>

        {/* Joining Date Field */}
        <div>
          <label className="block font-medium">Joining Date:</label>
          <input {...register("joiningDate")} type="date" className="w-full border p-2 rounded" />
          {errors.joiningDate && <p className="text-red-500 text-sm">{errors.joiningDate.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
