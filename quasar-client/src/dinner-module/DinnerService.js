import http from "../utils/http";

export class DinnerService {
  static async getProducts(params) {
    return (await http.get("api/shared/products", { params })).data;
  }

  static async makeClientRequest(reg) {
    return (await http.post("api/shared/client-request", reg)).data;
  }
}
