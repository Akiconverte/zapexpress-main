import { setChannelWebhook } from "../../helpers/setChannelHubWebhook";
import ListWhatsAppsService from "../WhatsappService/ListWhatsAppsService";
import { StartWhatsAppSession } from "./StartWhatsAppSession";
import * as Sentry from "@sentry/node";

export const StartAllWhatsAppsSessions = async (
  companyId: number
): Promise<void> => {

  console.log(`[LOG] StartAllWhatsAppsSessions chamado para companyId: ${companyId}`); // Adicionado aqui
  
  try {
    const whatsapps = await ListWhatsAppsService({ companyId });
    if (whatsapps.length > 0) {
      whatsapps.forEach(whatsapp => {
        if(whatsapp.type !== null) {
          setChannelWebhook(whatsapp, whatsapp.id.toString());
        } else {
          StartWhatsAppSession(whatsapp, companyId);
        }
      });
    }
  } catch (e) {
    Sentry.captureException(e);
  }
};
