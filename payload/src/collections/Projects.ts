import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true, // 👈 lecture publique, indispensable pour ton front
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'description', type: 'textarea' },
    { name: 'year', type: 'number' },
    { name: 'role', type: 'text' },
    { name: 'liveUrl', type: 'text' },
  ],
}
