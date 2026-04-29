import { defineType, defineField } from 'sanity'

export const portfolioItemType = defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Social Media', value: 'Social Media' },
          { title: 'Photography', value: 'Photography' },
          { title: 'Branding', value: 'Branding' },
          { title: 'Web Design', value: 'Web Design' },
          { title: 'Film', value: 'Film' },
        ],
        layout: 'tags',
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL (external fallback)',
      type: 'url',
      description: 'Used when no Sanity image asset is uploaded.',
    }),
    defineField({
      name: 'tallCard',
      title: 'Tall Card',
      type: 'boolean',
      description: 'Renders at 744 px on desktop instead of 699 px.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Positions 1 and 2 go in the left column; 3 and 4 go in the right (offset) column.',
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
      description: 'Optional link to the live project (the ↗ arrow button).',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      order: 'order',
    },
    prepare({ title, media, order }) {
      return {
        title,
        subtitle: `Position #${order}`,
        media,
      }
    },
  },
})
