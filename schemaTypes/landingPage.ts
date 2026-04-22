import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),

    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),

    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),

    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'productImages',
      title: 'Product Section Images',
      type: 'array',
      of: [{type: 'image'}],
      validation: (Rule) => Rule.max(3),
      description: 'Images for "Какво включва играта" section (up to 3).',
    }),
    defineField({
      name: 'featureImage',
      title: 'Feature Image',
      type: 'image',
    }),
    defineField({
      name: 'testimonialImage',
      title: 'Testimonial Image',
      type: 'image',
    })
  ],
})