const app = require("../src/app");
const session = require("supertest");
const request = session(app);

const character = {
  id: 923,
  name: "jose",
  species: "Human",
  gender: "Male",
  status: "Alive",
  origin: {
    name: "Earth (C-137)",
  },
  image: "image.jpg",
};

describe("test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      await request.get("/rickandmorty/character/1").expect(200);
    });

    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const response = await request.get("/rickandmorty/character/1");
      for (const prop in character) {
        expect(response.body).toHaveProperty(prop);
      }
    });

    it("Si hay un error responde con status: 500", async () => {
      const response = await request.get("/rickandmorty/character/3209");
      expect(response.statusCode).toBe(500);
    });
  });

  describe("GET /rickandmorty/login", () => {
    const access = { access: false };

    it("Response con un objeto con la propiedad access en true si la información del usuario es válida", async () => {
      const response = await request.get(
        "/rickandmorty/login?email=josemcentenoc@gmail.com&password=123abc"
      );
      const access = { access: true };
      expect(response.body).toEqual(access);
    });

    it("Response con un objeto con la propiedad access en true si la información del usuario no es válida", async () => {
      const response = await request.get(
        "/rickandmorty/login?email=josemcentenoc@gmail.com&password=123c"
      );
      access.access = false;
      expect(response.body).toEqual(access);
    });
  });

  describe("POST /rickandmorty/fav", () => {
    it("Debe guardar el personaje en favoritos", async () => {
      const response = await request.post("/rickandmorty/fav").send(character);
      expect(response.body).toContainEqual(character);
    });

    it("Debe agregar personajes a favoritos sin eliminar los ya existentes", async () => {
      character.id = 1215;
      character.name = "FT 37a";
      const response = await request.post("/rickandmorty/fav").send(character);
      expect(response.body.length).toBe(2);
    });
  });

  describe("DELETE /rickandmorty/fav/:id", () => {
    it("Si el ID solicitado no existe, deberia retornar un arreglo con todos los favoritos", async () => {
      const response = await request.delete("/rickandmorty/fav/1215d");
      expect(response.body.length).toBe(2);
    });

    it("Si el ID enviado existe deberia eliminarlo de favoritos", async () => {
      const response = await request.delete("/rickandmorty/fav/1215");
      expect(response.body.length).toBe(1);
    });
  });
});
