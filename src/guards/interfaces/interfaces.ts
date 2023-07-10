export interface JWTRequest {
  user: {
    email: string;
    id: number;
    username: string;
  };
}
