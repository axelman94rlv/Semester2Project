import type { CollectionConfig } from 'payload'

export const EnzoProjects: CollectionConfig = {
  slug: 'enzo-projects',
  labels: {
    singular: 'Projet Enzo',
    plural: 'Projets Enzo',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'lieu', 'year'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      label: 'Année',
    },
    {
      name: 'lieu',
      type: 'text',
      label: 'Lieu',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo (aperçu Finder)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'stack',
      type: 'array',
      label: 'Stack',
      labels: {
        singular: 'Techno',
        plural: 'Stack',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nom',
          required: true,
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
