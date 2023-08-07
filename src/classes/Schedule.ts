import cron, { schedule } from "node-cron";
import { BlipContact } from "./Blip";
import path from "path";
export class Schedule {
  private timeToSchedule: string;
  constructor(dateFormatted: string) {
    this.timeToSchedule = dateFormatted;
  }

  async schedule15Min(whatsapp: string) {
    const task:
      | string
      | ((now: Date | "init" | "manual") => void) = async () => {
      let sendMessage = new BlipContact(process.env.key || "", `55${whatsapp}`);

      await sendMessage.sendMessageTemplateWithRedirectionNewRouter(
        process.env.botId || "",
        process.env.flowId || "",
        process.env.blockId_minutos_antes || "",
        process.env.identifier || "",
        process.env.accessKey || "",
        process.env.organization || "",
        process.env.costCentre || "",
        process.env.template_carregamento_15min_menu || "",
        {
          body: ["San Cunha"],
        }
      );
      // return await updateDriverStatus(whatsapp, "Agendado", "Em Andamento");
    };
    await this.run(task);
  }

  async run(task: string | ((now: Date | "init" | "manual") => void)) {
    const schedule = cron.schedule(this.timeToSchedule, task, {
      scheduled: true,
      timezone: "America/Sao_Paulo",
    });
    schedule.start();
    console.log("Schedule Agendada para", this.timeToSchedule);
  }
}
