# Tamir Bakery

A home business that sells baked goods and pantry items (olives, spreads, jars) through a Hebrew-first website. Customers order without signing in; the owner confirms, takes payment directly and hands the order over by pickup or delivery.

## Language

### People

**Customer**:
A person who places an Order on the site. Never signs in.
_Avoid_: User, client, buyer, account

**Owner**:
The person who runs the business and fulfils Orders.
_Avoid_: Seller, baker, merchant

**Admin**:
A person on the admin allowlist who may manage Products, settings and Orders. The Owner is always an Admin.
_Avoid_: Manager, staff, user

### Catalogue

**Product**:
One item the business sells, baked or pantry, with a Hebrew name (required), an optional English name and a Slug.
_Avoid_: Item, SKU, listing

**Slug**:
The ASCII, URL-safe name that identifies a Product in its page address.
_Avoid_: Handle, permalink

### Ordering

**Cart**:
The Products a Customer has picked but not yet ordered. Lives only in the Customer's browser.
_Avoid_: Basket, bag

**Order**:
A Customer's request to buy specific Products, saved when they submit the Cart.
_Avoid_: Purchase, transaction, sale

**Order line**:
One Product in an Order, with the name, quantity and price as they were when the Order was placed.
_Avoid_: Item, row

**Order ref**:
The short code (like `TB-7K3Q`) that names an Order in conversation and in payment notes. Not the Order's secret link.
_Avoid_: Order number, order ID

**Order status**:
Where an Order is in its handling: new, confirmed, ready, completed, or cancelled.
_Avoid_: State, stage

**Payment status**:
Whether the Owner has received the money for an Order: unpaid or paid. Independent of Order status.
_Avoid_: Paid status, billing status

**Ordering open**:
The store-wide setting that decides whether Customers can place Orders. When it is off, the site is a Portfolio.

**Portfolio**:
The site with ordering switched off: Products are shown, and Customers ask about them on WhatsApp instead of ordering.
_Avoid_: Catalogue mode, read-only mode

## Relationships

- An **Order** has one or more **Order lines**, one **Order ref**, one **Order status** and one **Payment status**.
- An **Order** can be paid before or after it is confirmed.
- A **Cart** becomes an **Order** only when the **Customer** submits it.
