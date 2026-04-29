import Database from "better-sqlite3";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const dbPath = isProduction ? "/tmp/blog.db" : join(__dirname, "blog.db");

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    body TEXT,
    image TEXT,
    category TEXT,
    rating INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

const count = db.prepare("SELECT COUNT(*) AS total FROM items").get();

if (count.total === 0) {
  const insert = db.prepare(`
    INSERT INTO items (title, description, body, image, category, rating)
    VALUES (@title, @description, @body, @image, @category, @rating)
  `);

  const seeds = [
    {
      title: "Goku vs Freezer: La batalla que cambio Namek",
      description: "El enfrentamiento definitivo en el planeta Namek. Goku despierta el Super Saiyan por primera vez tras la muerte de Krillin, enfrentando al tirano mas poderoso del universo.",
      body: "La saga de Namek culmina con uno de los momentos mas iconicos del anime. Freezer, el emperador del universo, ha destruido todo a su paso. Cuando asesina a Krillin frente a los ojos de Goku, la rabia despierta algo que no se habia visto en mil anos: la transformacion en Super Saiyan. El planeta Namek tiembla mientras dos titanes chocan en una batalla que redefiniria Dragon Ball para siempre.",
      image: "https://dragonball-api.com/characters/Freezer.webp",
      category: "Batallas",
      rating: 5,
    },
    {
      title: "Gohan vs Cell: El despertar del poder oculto",
      description: "Cell lleva a Gohan al limite durante el Torneo de Cell. La rabia contenida del joven saiyajin explota en una transformacion de Super Saiyan 2 que nadie esperaba.",
      body: "Durante el Torneo de Cell, Goku sorprende a todos al ceder su lugar a su hijo Gohan. Cell, buscando desatar el verdadero poder del joven, crea los Cell Jr. para torturar a sus amigos. Cuando Androide 16 es destruido, algo se quiebra dentro de Gohan. Su poder dormido explota y alcanza el Super Saiyan 2, superando a Cell con una facilidad aterradora. El Kamehameha padre-hijo final sella la victoria.",
      image: "https://dragonball-api.com/characters/celula.webp",
      category: "Batallas",
      rating: 5,
    },
    {
      title: "Goku vs Vegeta: Rivales eternos",
      description: "Desde su primer combate en la Tierra, la rivalidad entre Goku y Vegeta ha definido la saga. Dos guerreros saiyajin con filosofias opuestas que se empujan mutuamente a superar sus limites.",
      body: "La rivalidad entre Goku y Vegeta es el motor narrativo de Dragon Ball. Desde la saga Saiyan, donde Vegeta llega a la Tierra como conquistador, hasta su combate en la saga de Buu donde Vegeta se deja poseer por Babidi solo para tener una pelea justa. Dos filosofias: Goku pelea por diversion y superacion; Vegeta por orgullo y honor. Juntos se han empujado mas alla de lo que cualquiera lograria solo.",
      image: "https://dragonball-api.com/characters/vegeta_normal.webp",
      category: "Batallas",
      rating: 5,
    },
    {
      title: "Vegeta: El principe de los Saiyajin",
      description: "De villano despiadado a protector de la Tierra. Vegeta es uno de los personajes con mayor desarrollo en toda la serie, luchando siempre por superar a Kakaroto.",
      body: "Vegeta llego a la Tierra como un villano sin piedad, pero con el tiempo se convirtio en padre, esposo y defensor del planeta que alguna vez quiso destruir. Su sacrificio contra Majin Buu, abrazando a Trunks antes de autodestruirse, es uno de los momentos mas emotivos de la serie. Su evolucion demuestra que el orgullo y el amor pueden coexistir.",
      image: "https://dragonball-api.com/characters/vegeta_normal.webp",
      category: "Personajes",
      rating: 5,
    },
    {
      title: "Piccolo: El Namekiano guerrero",
      description: "Antiguo enemigo de Goku convertido en mentor de Gohan. Piccolo es estratega, luchador y una figura paterna clave en la saga.",
      body: "Piccolo comenzo como la reencarnacion del Rey Demonio, jurando venganza contra Goku. Todo cambio cuando entreno a Gohan para enfrentar a los Saiyajin. El vinculo entre maestro y alumno transformo a Piccolo. Se sacrifico para proteger a Gohan contra Nappa, demostrando que su corazon habia cambiado por completo. Desde entonces, Piccolo ha sido un pilar estrategico y emocional del grupo.",
      image: "https://dragonball-api.com/characters/picolo_normal.webp",
      category: "Personajes",
      rating: 4,
    },
    {
      title: "Goku: El heroe de la Tierra",
      description: "Enviado al planeta Tierra siendo un bebe, Goku crecio hasta convertirse en el guerrero mas fuerte del universo. Su espiritu de lucha y bondad lo definen.",
      body: "Son Goku, nacido como Kakaroto, fue enviado a la Tierra para conquistarla. Un golpe en la cabeza borro sus instintos agresivos y lo convirtio en un nino puro de corazon. Entrenado por el Maestro Roshi, Karin, Kami-sama, Kaio-sama y Whis, Goku ha superado cada limite imaginable. Desde el primer Torneo de Artes Marciales hasta el Torneo de Poder, su hambre de superacion nunca se detiene.",
      image: "https://dragonball-api.com/characters/goku_normal.webp",
      category: "Personajes",
      rating: 5,
    },
    {
      title: "Gohan: El guerrero academico",
      description: "Hijo de Goku con un potencial de pelea inigualable. A pesar de preferir los estudios, Gohan ha demostrado ser decisivo en los momentos mas criticos.",
      body: "Gohan siempre fue diferente. Mientras su padre vivia para pelear, el preferia los libros. Pero cuando el universo lo necesita, Gohan responde con un poder que supera incluso a su padre. Derroto a Cell, enfrento a Buu como Gohan Definitivo, y en Dragon Ball Super demostro que puede equilibrar su vida academica con su deber como guerrero.",
      image: "https://dragonball-api.com/characters/gohan.webp",
      category: "Personajes",
      rating: 4,
    },
    {
      title: "Super Saiyan: La leyenda dorada",
      description: "La transformacion legendaria que aparece cada mil anos. Goku fue el primero en alcanzarla en la era moderna, desatando un poder multiplicado por 50.",
      body: "La leyenda del Super Saiyan era considerada un mito entre los saiyajin. Se decia que cada mil anos, un guerrero con un poder inmenso surgia con cabello dorado y ojos verdes. Goku lo alcanzo en Namek impulsado por la rabia. Despues vinieron el Super Saiyan 2, 3, y mas alla. Esta transformacion cambio las reglas de poder en Dragon Ball para siempre.",
      image: "https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2021/02/Dragon-Ball-Cual-es-el-verdadero-Super-Saiyajin-legendario-1.png?resize=640%2C720&ssl=1",
      category: "Transformaciones",
      rating: 5,
    },
    {
      title: "Ultra Instinto: Mas alla de los dioses",
      description: "Una tecnica que ni los Dioses de la Destruccion dominan por completo. El cuerpo se mueve y reacciona de forma autonoma, sin necesidad de pensar.",
      body: "El Ultra Instinto no es una transformacion convencional, es un estado mental. El cuerpo esquiva y ataca por instinto, sin que la mente interfiera. Goku lo activo por primera vez contra Jiren en el Torneo de Poder, sorprendiendo incluso a los dioses. En su forma completa, el cabello se vuelve plateado y el poder rivaliza con los angeles. Es la cima del combate en Dragon Ball.",
      image: "https://wallpapers.com/images/hd/silver-goku-mastered-ultra-instinct-ud1e5njk07gp83gc.jpg",
      category: "Transformaciones",
      rating: 5,
    },
    {
      title: "Super Saiyan Blue: El ki divino",
      description: "La combinacion del Super Saiyan con el ki de los dioses. Goku y Vegeta alcanzan esta forma tras entrenar con Whis, el angel del Dios de la Destruccion.",
      body: "Tras los eventos de la saga de Bills, Goku y Vegeta entrenan con Whis en el planeta de Bills. Aprenden a controlar el ki divino y combinarlo con la transformacion Super Saiyan. El resultado es el Super Saiyan Blue: cabello azul, aura calmada y un poder que compite con los dioses. Esta forma se convierte en su estado base para las batallas de Dragon Ball Super.",
      image: "https://f.rpp-noticias.io/2019/05/01/784317dragon-ball-fighterz-super-saiyan-goky-vetegajpgoptimaljpg.jpg",
      category: "Transformaciones",
      rating: 4,
    },
    {
      title: "Goku vs Jiren: El Torneo de Poder",
      description: "El combate final del Torneo de Poder enfrenta a Goku contra Jiren, el mortal mas fuerte del multiverso. Aqui Goku despierta el Ultra Instinto completo.",
      body: "El Torneo de Poder pone en juego la existencia de universos enteros. Jiren, del Universo 11, es un mortal cuyo poder supera a los Dioses de la Destruccion. Goku, agotado y sin opciones, trasciende sus limites y despierta el Ultra Instinto Dominado. La batalla final sacude las gradas del Mundo Nulo. Al final, la victoria del Universo 7 se logra gracias al trabajo en equipo de Goku, Freezer y Androide 17.",
      image: "https://i.redd.it/ypc9fay1ppw51.jpg",
      category: "Batallas",
      rating: 5,
    },
    {
      title: "Fusion: Dos guerreros, un solo ser",
      description: "Ya sea por la Danza de la Fusion o los Pendientes Potara, la fusion combina el poder de dos guerreros. Gogeta y Vegito son las fusiones mas iconicas.",
      body: "La fusion es una tecnica que permite a dos guerreros unirse en un solo ser con poder multiplicado. Existen dos metodos: la Danza de la Fusion, que crea a Gogeta y dura 30 minutos, y los Pendientes Potara, que crean a Vegito y en teoria son permanentes. Ambas fusiones de Goku y Vegeta han demostrado un poder absurdo, enfrentando enemigos como Janemba, Super Buu y Broly.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuIlCblZI1xx9VkEjR81YbdTplDSq8uaX2QA&s",
      category: "Transformaciones",
      rating: 4,
    },
  ];

  for (const seed of seeds) {
    insert.run(seed);
  }
}

export default db;
