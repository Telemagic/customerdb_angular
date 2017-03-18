
export interface Customer {
  "customer": String
  "siteNick": String
  "license": CustomerLicense
  "contacts": CustomerContact[]
}

export interface CustomerContact {
  "email": String
  "patchNotification": boolean
  "alertNotification": boolean
}

export interface CustomerLicense {
  "numberOfAgents": number
}
