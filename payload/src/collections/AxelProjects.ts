import type { CollectionConfig } from 'payload'

export const AxelProjects: CollectionConfig = {
  slug: 'axel-projects',

  access: {
    read: () => true, // lecture publique, consommée par le front
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['order', 'title', 'year'],
  },

  fields: [
    {
      name: 'order',
      type: 'number',
      required: true,
      unique: true,
      label: 'Ordre dans le carrousel',
      admin: {
        description: 'Donne le numéro affiché sur la carte : 1 → 001, 2 → 002…',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre du projet',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 300,
      label: 'Description courte (carte du carrousel)',
      admin: {
        description: 'La carte fait 6 lignes environ. Au-delà, ça déborde.',
      },
    },
    {
      name: 'longDescription',
      type: 'textarea',
      label: 'Description longue (« Afficher plus »)',
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Photos du projet',
    },
    {
      name: 'stack',
      type: 'array',
      label: 'Stack technique',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nom',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo',
        },
      ],
    },
    {
      name: 'liveUrl',
      type: 'text',
      label: 'Lien du projet',
    },
    {
      name: 'year',
      type: 'number',
      label: 'Année',
    },
  ],
}
