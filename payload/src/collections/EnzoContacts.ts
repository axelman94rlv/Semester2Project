import type { CollectionConfig } from 'payload'

export const EnzoContacts: CollectionConfig = {
  slug: 'enzo-contacts',
  labels: {
    singular: 'Contact Enzo',
    plural: 'Contacts Enzo',
  },
  access: {
    create: () => true,
    read: () => true,
  },
  admin: {
    useAsTitle: 'nom',
    defaultColumns: ['nom', 'entreprise', 'email', 'createdAt'],
  },
  fields: [
    {
      name: 'nom',
      type: 'text',
      label: 'Nom',
      required: true,
    },
    {
      name: 'entreprise',
      type: 'text',
      label: "Nom de l'entreprise",
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      required: true,
    },
  ],
}
