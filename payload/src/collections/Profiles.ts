import type { CollectionConfig } from 'payload'

export const Profiles: CollectionConfig = {
  slug: 'profiles',

  access: {
    read: () => true, // lecture publique, consommée par le front
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'email'],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom complet',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      label: 'Rôle',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (section « Qui suis-je »)',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo de profil',
    },
    {
      type: 'collapsible',
      label: 'Liens',
      fields: [
        {
          name: 'githubUrl',
          type: 'text',
          label: 'URL GitHub',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn (identifiant affiché)',
        },
        {
          name: 'linkedinUrl',
          type: 'text',
          label: 'LinkedIn (URL du lien)',
        },
        {
          name: 'cv',
          type: 'upload',
          relationTo: 'media',
          label: 'CV (PDF)',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Contact',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Téléphone',
        },
        {
          name: 'location',
          type: 'text',
          label: 'Localisation',
        },
      ],
    },
  ],
}
