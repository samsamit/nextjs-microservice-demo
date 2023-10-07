import fsPromises from "fs/promises"
import path from "path"
import { z } from "zod"

const ItemSchema = z.object({
  name: z.string(),
  price: z.number(),
})
type Item = z.infer<typeof ItemSchema>

const Store = async () => {
  const items = await getItemData()
  return (
    <div className="flex align-middle flex-wrap gap-16 p-32">
      {items.map((item) => (
        <div className="flex flex-col gap-4 border border-fuchsia-500 p-8">
          <span className="text-xl">{item.name}</span>
          <span className="text-sm ml-auto">{item.price}€</span>
        </div>
      ))}
    </div>
  )
}

async function getItemData() {
  // Get the path of the json file
  const filePath = path.join(process.cwd(), "mocData/items.json")
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath, { encoding: "utf-8" })
  // Parse data as json
  const objectData = JSON.parse(jsonData) as Object[]

  const items = objectData.map<Item>((data) => ItemSchema.parse(data))
  return items
}

export default Store
