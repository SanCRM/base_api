import axios from "axios";
import { v1 as uuidv1 } from "uuid";
import oauthSignature from "oauth-signature";

type OAuthParams = {
  oauth_consumer_key: string;
  oauth_nonce: string;
  oauth_signature_method: string;
  oauth_token: string;
  oauth_version: string;
  oauth_timestamp: number;
  oauth_signature?: string;
};

export class Fluig {
  private baseUrl = process.env.base_url_fluig;
  private baseConfig: OAuthParams = {
    oauth_consumer_key: process.env.oauth_consumer_key || "",
    oauth_nonce: "",
    oauth_signature_method: process.env.oauth_signature_method || "",
    oauth_token: process.env.oauth_token || "",
    oauth_version: process.env.oauth_version || "",
    oauth_timestamp: 0,
  };
  private config = {
    method: "",
    url: this.baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    params: this.baseConfig,
    data: {},
  };
  private secrets = {
    consumerSecret: process.env.consumerSecret || "",
    tokenSecret: process.env.tokenSecret || "",
  };

  async doRequest(request: string, data = {}) {
    switch (request) {
      case "updateTable":
        return await this.updateTable(data);
      case "getInfos":
        return await this.getInfos(data);
      case "assumeTask":
        return await this.assumeTask(data);
      case "moveSolic":
        return await this.moveSolic(data);
    }
  }

  async updateTable(data: any) {
    const path = `/api/public/ecm/dataset/datasets/`;

    return await this.requestFluig("POST", path, data);
  }

  async getInfos(data: any) {
    Object.assign(this.config.params, {
      processInstanceId: data.processInstanceId,
      stateSequence: "33",
    });
    const path = "/process-management/api/v2/tasks";

    return await this.requestFluig("GET", path, {});
  }

  async assumeTask(data: any) {
    const path = "/webdesk/ECMWorkflowEngineService";
    const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.workflow.ecm.technology.totvs.com/">
<soapenv:Header/>
  <soapenv:Body>
    <ws:takeProcessTask>
      <username>san.silva</username>
      <password>**san.silva2023</password>
      <companyId>01</companyId>
      <userId>san.silva</userId>
      <processInstanceId>${data.processInstanceId}</processInstanceId>
      <threadSequence>${data.threadSequence}</threadSequence>
    </ws:takeProcessTask>
  </soapenv:Body>
</soapenv:Envelope>`;

    return await this.requestFluig("POST", path, body);
  }

  async moveSolic(data: any) {
    const path = "/webdesk/ECMWorkflowEngineService";
    const body = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.workflow.ecm.technology.totvs.com/">
        <soapenv:Header/>
        <soapenv:Body>
           <ws:saveAndSendTask>
           <username>san.silva</username>
           <password>**san.silva2023</password>
           <companyId>1</companyId>
              <processInstanceId>${data.processInstanceId}</processInstanceId>
              <choosedState>29</choosedState>
              <colleagueIds>
              </colleagueIds>
              <comments>Solicitação movimentada via ChatBot</comments>
              <userId>san.silva</userId>
              <completeTask>true</completeTask>
              <attachments>
              </attachments>
              <cardData>
              </cardData>
              <appointment>
              </appointment>
              <managerMode>false</managerMode>
              <threadSequence>0</threadSequence>
           </ws:saveAndSendTask>
        </soapenv:Body>
     </soapenv:Envelope>`;
    return await this.requestFluig("POST", path, body);
  }
  async requestFluig(method: string, path: string, data = {} || "") {
    await this.configRequestFluig(method, path, data);

    console.log(this.config);
    const response = await axios(this.config);

    this.config.params = this.baseConfig;

    return {
      error: false,
      code: 0,
      message: "",
      data: response.data,
    };
  }

  async configRequestFluig(
    method: string,
    path: string,
    data: {} | string,
    contentType = "application/json"
  ) {
    this.config.method = method;
    this.config.url = this.baseUrl + `${path}`;
    this.config.data = data;
    this.config.headers["Content-Type"] =
      typeof data != "string" ? contentType : "text/xml";
    this.config.params.oauth_signature = await this.generateSignature(
      method,
      this.config.url
    );
  }

  async generateSignature(method: string, path: string) {
    if (this.config.params.oauth_signature)
      delete this.config.params.oauth_signature;

    this.config.params.oauth_nonce = uuidv1();
    this.config.params.oauth_timestamp = Math.floor(Date.now() / 1000);

    return oauthSignature.generate(
      method,
      path,
      this.config.params,
      this.secrets.consumerSecret,
      this.secrets.tokenSecret,
      { encodeSignature: false }
    );
  }
}
