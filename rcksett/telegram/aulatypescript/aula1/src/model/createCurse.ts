export interface curse {
  name: string;
  description: string;
  duration?: number;
  education: string;
}
 class CreateCurseService {
  execute(data: curse){
    return data
  }
}

export default new CreateCurseService();