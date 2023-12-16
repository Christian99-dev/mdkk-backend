import type { Schema, Attribute } from '@strapi/strapi';

export interface AllArbeitskarte extends Schema.Component {
  collectionName: 'components_all_arbeitskartes';
  info: {
    displayName: 'Taetigkeit';
    description: '';
  };
  attributes: {
    Beschreibung: Attribute.Text & Attribute.Required;
    Bild: Attribute.Media & Attribute.Required;
  };
}

export interface AllSeoPageInfo extends Schema.Component {
  collectionName: 'components_all_seo_page_infos';
  info: {
    displayName: 'SeoPageInfo';
  };
  attributes: {
    SeitenTitel: Attribute.String & Attribute.Required;
    SeitenBeschreibung: Attribute.Text & Attribute.Required;
  };
}

export interface AllText extends Schema.Component {
  collectionName: 'components_all_texts';
  info: {
    displayName: 'Text';
  };
  attributes: {
    Text: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'all.arbeitskarte': AllArbeitskarte;
      'all.seo-page-info': AllSeoPageInfo;
      'all.text': AllText;
    }
  }
}
