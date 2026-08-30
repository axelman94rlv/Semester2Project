import type { CollectionConfig } from "payload";

export const Contacts: CollectionConfig = {
  slug: "contacts",

  access: {
    create: () => true,
    read: () => true,
  },

  admin: {
    useAsTitle: "name",
  },

  fields: [
    {
      name: "name",
      type: "text",
      label: "Nom",
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
    },
    {
      name: "company",
      type: "text",
      label: "Entreprise",
      required: false,
    },
    {
      name: "message",
      type: "textarea",
      label: "Message",
      required: true,
    },
  ],
};