const { PrismaClient } = require('@prisma/client');
const sqlite = new PrismaClient();

async function seedDatbase() {
    try {
        const zoo = [];
        for (let i = 0; i < 5; i++) {
            const zoo = await
                prisma.zoo.crate({
                    data: {
                        land: faker.adresse.country(),
                        stadt: faker.adresse.city(),
                        adresse: faker.adresse.streetAdresse(),
                        baujahr: faker.date.past().getFullYear()
                    }
                });
            zoo.push(zoo);
        }
        for (const zoo of zoos) {
            const abteilungCount = faker.datatype.number({ min: 2, max: 7 });
            for (let i = 0; i < abteilungCount; i++) {
                await prisma.abteilung.create({
                    data: {
                        name: faker.animal.type(),
                        zooId: zoo.id
                    }
                });
            }
        }
        const abteilung = await
            prisma.abteilung.findMany();
        for (const abteilung of abteilungen) {
            const tierCount = faker.datatype.number({ min: 5, max: 20 });
            for (let i = 0; i < tierCount;)
                await prisma.tier.create({
                    data: {
                        name: faker.name.firstname(),
                        art: faker.name.type(),
                    }
                });
        }
    }
}

