'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const properties = [
      {
        title: 'Modern Downtown Apartment',
        description: 'Beautiful 2-bedroom apartment in the heart of downtown with city views, modern amenities, and walking distance to restaurants and shops.',
        price: 350000.00,
        bedrooms: 2,
        bathrooms: 2,
        area: 1200.00,
        type: 'apartment',
        location: 'Downtown, New York, NY',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Suburban Family Home',
        description: 'Spacious 4-bedroom house with large backyard, perfect for families. Close to schools and parks. Recently renovated kitchen and bathrooms.',
        price: 525000.00,
        bedrooms: 4,
        bathrooms: 3,
        area: 2800.00,
        type: 'house',
        location: 'Westchester, NY',
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Luxury Penthouse Suite',
        description: 'Exclusive penthouse with panoramic city views, high-end finishes, private elevator, and rooftop terrace. Building amenities include gym, pool, and concierge service.',
        price: 1250000.00,
        bedrooms: 3,
        bathrooms: 3,
        area: 2200.00,
        type: 'penthouse',
        location: 'Manhattan, New York, NY',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cozy Studio Loft',
        description: 'Charming studio loft with exposed brick walls, high ceilings, and large windows. Perfect for young professionals or students. Great location near public transportation.',
        price: 185000.00,
        bedrooms: 1,
        bathrooms: 1,
        area: 650.00,
        type: 'studio',
        location: 'Brooklyn, NY',
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Waterfront Townhouse',
        description: 'Stunning 3-story townhouse with water views, private dock, and modern design. Features include gourmet kitchen, master suite with balcony, and attached garage.',
        price: 875000.00,
        bedrooms: 3,
        bathrooms: 2,
        area: 2400.00,
        type: 'townhouse',
        location: 'Jersey City, NJ',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Historic Brownstone',
        description: 'Beautifully restored 19th-century brownstone with original architectural details. Features include original hardwood floors, marble fireplaces, and updated kitchen.',
        price: 950000.00,
        bedrooms: 5,
        bathrooms: 4,
        area: 3200.00,
        type: 'brownstone',
        location: 'Harlem, New York, NY',
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Mountain View Cabin',
        description: 'Rustic cabin with stunning mountain views, wrap-around porch, and modern amenities. Perfect weekend getaway or full-time residence. Close to hiking trails and ski resorts.',
        price: 425000.00,
        bedrooms: 3,
        bathrooms: 2,
        area: 1800.00,
        type: 'cabin',
        location: 'Catskills, NY',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Beachfront Condo',
        description: 'Oceanfront condominium with direct beach access, balcony with ocean views, and resort-style amenities. Building includes pool, tennis courts, and beach club.',
        price: 650000.00,
        bedrooms: 2,
        bathrooms: 2,
        area: 1400.00,
        type: 'condo',
        location: 'Long Beach, NY',
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Properties', properties, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Properties', null, {});
  }
};
