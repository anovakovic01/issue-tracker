package com.issuetracker.dto

import play.api.libs.json._
import com.issuetracker.model.Issue
import com.issuetracker.model.IssueStatus._

case class GetIssue(
                           id: Long,
                           title: String,
                           description: String,
                           created: Long,
                           ownerId: Long,
                           status: IssueStatus
                      )

object GetIssue {

  implicit val getIssueWrites = Json.writes[GetIssue]

  implicit def issueToGetIssue(issue: Issue): GetIssue =
    new GetIssue(
      issue.id,
      issue.title,
      issue.description,
      issue.created,
      issue.ownerId,
      issue.status
    )

}