'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const rentalPeriodSchema = z
  .object({
    from: z.date().optional(),
    to: z.date().optional(),
  })
  .refine(
    (value) => value.from && value.to,
    {
      message: 'Please select rental period.',
      path: ['from'],
    },
  )
  .refine(
    (value) =>
      !value.from || !value.to || value.to.getTime() >= value.from.getTime(),
    {
      message: 'End date must be after start date.',
      path: ['to'],
    },
  );

const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  rentalPeriod: rentalPeriodSchema,
  comment: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const { toast } = useToast();
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      comment: '',
      rentalPeriod: {
        from: undefined,
        to: undefined,
      },
    },
  });

  function onSubmit(data: BookingFormValues) {
    if (!data.rentalPeriod?.from || !data.rentalPeriod?.to) {
      return;
    }

    const fromFormatted = format(data.rentalPeriod.from, 'PPP');
    const toFormatted = format(data.rentalPeriod.to, 'PPP');

    toast({
      title: 'Booking successful',
      description: `Thank you, ${data.name}. Your rental from ${fromFormatted} to ${toFormatted} has been confirmed.`,
    });
    form.reset();
  }

  return (
    <Card className="w-full rounded-[10px] p-8 outline outline-1 outline-offset-[-1px] outline-gray-300">
       <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-semibold leading-6">Book your car now</CardTitle>
        <CardDescription className="text-base text-muted-foreground font-medium leading-5">
          Stay connected! We are always ready to help you.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name*" {...field} className="bg-secondary h-12 rounded-xl px-5 py-3 text-muted-foreground text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email*" {...field} className="bg-secondary h-12 rounded-xl px-5 py-3.5 text-muted-foreground text-base"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rentalPeriod"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-5 text-left font-medium h-12 rounded-xl bg-secondary text-base',
                              !field.value?.from &&
                                !field.value?.to &&
                                'text-muted-foreground',
                            )}
                          >
                            {field.value?.from && field.value?.to ? (
                              <>
                                {format(field.value.from, 'PPP')} -{' '}
                                {format(field.value.to, 'PPP')}
                              </>
                            ) : (
                              <span>Rental period</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={
                            field.value as unknown as DateRange | undefined
                          }
                          onSelect={(range) => field.onChange(range)}
                          disabled={(date) =>
                            date < new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Comment"
                        className="resize-none bg-secondary rounded-xl min-h-[90px] px-5 pt-3 pb-14 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-40 bg-primary hover:bg-primary-active h-12 rounded-xl text-base"
              >
                Send
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
