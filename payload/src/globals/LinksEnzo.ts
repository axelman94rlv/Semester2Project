import type { GlobalConfig } from 'payload'

export const LinksEnzo: GlobalConfig = {
  slug: 'links-enzo',
  label: 'Liens Enzo',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'github',
      type: 'text',
      label: 'GitHub',
    },
    {
      name: 'linkedin',
      type: 'text',
      label: 'LinkedIn',
    },
    {
      name: 'strava',
      type: 'text',
      label: 'Strava',
    },
  ],
}
