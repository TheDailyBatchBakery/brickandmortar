import { NextResponse } from 'next/server';

// This is sample menu data - in production, this would come from a database
const sampleMenu = {
  categories: [
    {
      id: 'appetizers',
      name: 'Appetizers',
      items: [
        {
          id: '1',
          name: 'Mozzarella Sticks',
          description: 'Crispy golden mozzarella sticks served with marinara sauce',
          price: 8.99,
          category: 'appetizers',
        },
        {
          id: '2',
          name: 'Chicken Wings',
          description: 'Spicy buffalo wings with blue cheese dip',
          price: 12.99,
          category: 'appetizers',
          options: {
            flavors: ['Mild', 'Medium', 'Hot', 'BBQ'],
          },
        },
      ],
    },
    {
      id: 'mains',
      name: 'Main Courses',
      items: [
        {
          id: '3',
          name: 'Classic Burger',
          description: 'Juicy beef patty with lettuce, tomato, and special sauce',
          price: 14.99,
          category: 'mains',
          options: {
            sizes: [
              { name: 'Regular', price: 14.99 },
              { name: 'Large', price: 17.99 },
            ],
            addOns: [
              { name: 'Bacon', price: 2.99 },
              { name: 'Cheese', price: 1.99 },
              { name: 'Avocado', price: 2.49 },
            ],
          },
        },
        {
          id: '4',
          name: 'Caesar Salad',
          description: 'Fresh romaine lettuce with caesar dressing',
          price: 10.99,
          category: 'mains',
          options: {
            addOns: [
              { name: 'Grilled Chicken', price: 4.99 },
              { name: 'Shrimp', price: 5.99 },
            ],
          },
        },
      ],
    },
    {
      id: 'desserts',
      name: 'Desserts',
      items: [
        {
          id: '5',
          name: 'Chocolate Cake',
          description: 'Rich chocolate layer cake',
          price: 7.99,
          category: 'desserts',
        },
        {
          id: '6',
          name: 'Ice Cream Sundae',
          description: 'Vanilla ice cream with hot fudge and whipped cream',
          price: 6.99,
          category: 'desserts',
          options: {
            flavors: ['Vanilla', 'Chocolate', 'Strawberry'],
            addOns: [
              { name: 'Nuts', price: 0.99 },
              { name: 'Cherry', price: 0.49 },
            ],
          },
        },
      ],
    },
  ],
};

export async function GET() {
  // In production, fetch from database
  // For now, return sample data
  return NextResponse.json(sampleMenu);
}

