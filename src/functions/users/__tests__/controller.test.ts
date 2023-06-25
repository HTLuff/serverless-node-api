import {
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda/trigger/api-gateway-proxy";

import * as usersService from "@functions/users/users.service";
import { IMoviesByYearResponse } from "@functions/users/users.service";
import {
  ICreateMovieDTO,
  UpdateMovieInfoDTO,
} from "@repositories/movie.repository";
import { ICustomAPIGatewayProxyEvent } from "@libs/api-gateway";
import { IMovie } from "@models/movie.model";
import * as controller from "./movie.controller";

describe("MovieController", () => {
  describe("createMovie()", () => {
    it("should return create a new movie", async () => {
      const newMovie = "new-movie" as unknown as IMovie;
      const dto = { title: "new-movie-title", year: 2000 } as ICreateMovieDTO;
      jest
        .spyOn(usersService, "createMovie")
        .mockName("usersService.createMovie")
        .mockResolvedValue(newMovie);

      const actual = await controller.createMovie({
        body: dto,
      } as ICustomAPIGatewayProxyEvent<ICreateMovieDTO>);

      expect(usersService.createMovie).toHaveBeenCalledWith(dto);
      expect(actual).toBe(newMovie);
    });
  });

  describe("getMoviesByYear()", () => {
    it("should return moves by year", async () => {
      const movies = {
        data: ["movies"] as unknown as IMovie[],
        nextPageToken: "next-page-token",
      } as IMoviesByYearResponse;
      jest
        .spyOn(usersService, "getMoviesByYear")
        .mockName("usersService.getMoviesByYear")
        .mockResolvedValue(movies);
      const pathParameters = {
        year: "2000",
      } as APIGatewayProxyEventPathParameters;
      const queryStringParameters = {
        nextPageToken: "old-next-page-token",
      } as APIGatewayProxyEventQueryStringParameters;

      const actual = await controller.getMoviesByYear({
        pathParameters,
        queryStringParameters,
      } as ICustomAPIGatewayProxyEvent);

      expect(usersService.getMoviesByYear).toHaveBeenCalledWith(
        2000,
        "old-next-page-token"
      );
      expect(actual).toBe(movies);
    });
  });

  describe("getMovieDetail()", () => {
    it("should return move detail", async () => {
      const movie = "movie" as unknown as IMovie;
      jest
        .spyOn(usersService, "getMoviesByTitleAndYear")
        .mockName("usersService.getMoviesByTitleAndYear")
        .mockResolvedValue(movie);
      const pathParameters = {
        title: "Big Momma's House",
        year: "2000",
      } as APIGatewayProxyEventPathParameters;

      const actual = await controller.getMovieDetail({
        pathParameters,
      } as ICustomAPIGatewayProxyEvent);

      expect(usersService.getMoviesByTitleAndYear).toHaveBeenCalledWith(
        "Big Momma's House",
        2000
      );
      expect(actual).toBe(movie);
    });
  });

  describe("deleteMovie()", () => {
    it("should delete a movie by title and year", async () => {
      jest
        .spyOn(usersService, "deleteMovieByTitleAndYear")
        .mockName("usersService.deleteMovieByTitleAndYear")
        .mockResolvedValue();

      const pathParameters = {
        title: "Big Momma's House",
        year: "2000",
      } as APIGatewayProxyEventPathParameters;

      await controller.deleteMove({
        pathParameters,
      } as ICustomAPIGatewayProxyEvent);

      expect(usersService.deleteMovieByTitleAndYear).toHaveBeenCalledWith(
        "Big Momma's House",
        2000
      );
    });
  });

  describe("updateMovieInfo()", () => {
    it("should update movie info by title and year", async () => {
      const updatedMovie = "updated-movie" as unknown as IMovie;
      jest
        .spyOn(usersService, "updateMovieInfoByTitleAndYear")
        .mockName("usersService.updateMovieInfoByTitleAndYear")
        .mockResolvedValue(updatedMovie);
      const pathParameters = {
        title: "Big Momma's House",
        year: "2000",
      } as APIGatewayProxyEventPathParameters;
      const info = "new-info" as unknown as UpdateMovieInfoDTO;

      const actual = await controller.updateMovieInfo({
        body: info,
        pathParameters,
      } as ICustomAPIGatewayProxyEvent<UpdateMovieInfoDTO>);

      expect(usersService.updateMovieInfoByTitleAndYear).toHaveBeenCalledWith(
        "Big Momma's House",
        2000,
        info
      );
      expect(actual).toBe(updatedMovie);
    });
  });
});
