package com.issuetracker

import com.issuetracker.controller.UserController
import com.issuetracker.repository.UserRepository
import com.issuetracker.service.UserService

import play.api.ApplicationLoader
import play.api.ApplicationLoader.Context
import play.api.BuiltInComponentsFromContext
import play.api.db.slick.DbName
import play.api.db.slick.SlickComponents
import play.filters.HttpFiltersComponents
import router.Routes
import slick.jdbc.JdbcProfile

class MainApplicationLoader extends ApplicationLoader {
  def load(context: Context) = {
    new ApplicationComponents(context).application
  }
}

class ApplicationComponents(context: Context) 
  extends BuiltInComponentsFromContext(context)
  with HttpFiltersComponents
  with SlickComponents {
  
  lazy val dbConfig = slickApi.dbConfig[JdbcProfile](DbName("default"))
  
  lazy val userRepository = new UserRepository(dbConfig.db)
  userRepository.create
  
  lazy val userService = new UserService(userRepository)
  
  lazy val userController = new UserController(controllerComponents, userService)
  
  lazy val router = new Routes(httpErrorHandler, userController)
}