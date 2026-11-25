# Customers reach their Order by a secret link, not an account

Customers never sign in. An Order's page (`/order/[id]`) is addressed by the Order's random Firestore ID, so the link itself is the key: whoever holds it can see that Order, including the bank details for payment. A short Order ref (like `TB-7K3Q`) names the Order in conversation and payment notes but never opens it. We chose this because the phase 1 success test is "customers order without messaging first", and any sign-in step (accounts, or a phone plus one-time code) adds friction and cost for a store with a few dozen orders a month.

## Considered options

- **Customer accounts** (Firebase Auth for customers): rejected; customers would have to sign up to buy a cake.
- **Look up by phone plus a one-time SMS code**: rejected for phase 1; SMS costs money per message and needs another provider. Could be added later on top of the link.

## Consequences

- The ID must stay unguessable (Firestore auto-ID, 20 characters); never use the Order ref or a counter in the URL.
- The page is `noindex`, sends `Referrer-Policy: no-referrer`, and shows no more personal data than the Customer typed.
- Links already sent to customers keep working, so changing this later means supporting the old links too.
