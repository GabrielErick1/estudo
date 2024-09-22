import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email().optional(), // Email é opcional, mas precisa ser um email válido
  username: z.string().optional(),      // Username também é opcional
  senha: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }) // Senha obrigatória
}).refine(data => data.email || data.username, {
  message: "É necessário fornecer um email ou username",
  path: ["email", "username"]
});

export const clientZod = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})


type IUser = z.infer<typeof userSchema>;